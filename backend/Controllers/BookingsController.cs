using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalCarBE.Api.Data;
using RentalCarBE.Api.Models.DTOs.Bookings;
using RentalCarBE.Api.Models.Entities;
using RentalCarBE.Api.Models.Enums;
using RentalCarBE.Api.Services;
using System.Security.Claims;

namespace RentalCarBE.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IContractPdfService _pdfService;

    public BookingsController(AppDbContext db, IContractPdfService pdfService)
    {
        _db = db;
        _pdfService = pdfService;
    }

    private Guid GetUserId()
    {
        var idStr = User.FindFirstValue(ClaimTypes.NameIdentifier)
                  ?? User.FindFirstValue("sub");
        return Guid.Parse(idStr!);
    }

    private string GenerateContractNumber(Guid bookingId)
    {
        return $"KC-{DateTime.UtcNow:yyyyMMdd}-{bookingId.ToString()[..6].ToUpper()}";
    }

    private string BuildContractSnapshot(Booking b)
    {
        return $@"
HỢP ĐỒNG THUÊ XE

1. THÔNG TIN XE
- Xe: {b.CarNameSnapshot}
- Biển số: {b.CarLicensePlateSnapshot}

2. THÔNG TIN THUÊ
- Thời gian nhận xe: {b.StartAt:dd/MM/yyyy HH:mm}
- Thời gian trả xe: {b.EndAt:dd/MM/yyyy HH:mm}
- Địa điểm nhận xe: {b.PickupAddress}

3. CHI PHÍ
- Giá thuê/ngày: {b.PricePerDay:N0} VNĐ
- Bảo hiểm/ngày: {b.InsurancePerDay:N0} VNĐ
- Số ngày thuê: {b.RentalDays}
- Giảm giá: {b.DiscountAmount:N0} VNĐ
- Tổng tiền: {b.TotalAmount:N0} VNĐ

4. GIẤY TỜ THUÊ XE
- {b.RentalPapers}

5. TÀI SẢN THẾ CHẤP
- {b.Collateral}

6. XÁC NHẬN ĐIỆN TỬ

BÊN CHO THUÊ
- Ký bởi: {b.OwnerNameSnapshot}
- Ngày ký: {(b.OwnerAgreedAt.HasValue ? b.OwnerAgreedAt.Value.ToLocalTime().ToString("dd/MM/yyyy HH:mm:ss") : "Chưa xác nhận")}
- Lý do: {b.OwnerAgreementReason ?? "Chưa xác nhận"}

BÊN THUÊ
- Ký bởi: {b.CustomerNameSnapshot}
- Ngày ký: {(b.CustomerAgreedAt.HasValue ? b.CustomerAgreedAt.Value.ToLocalTime().ToString("dd/MM/yyyy HH:mm:ss") : "Chưa xác nhận")}
- Lý do: {b.CustomerAgreementReason ?? "Chưa xác nhận"}
";
    }

    // POST /api/bookings
    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
    {
        if (!dto.CustomerAgreedTerms)
            return BadRequest(new { message = "Bạn cần đồng ý hợp đồng trước khi gửi yêu cầu." });

        if (dto.CarId == Guid.Empty)
            return BadRequest(new { message = "CarId không hợp lệ." });

        if (dto.StartAt < DateTime.UtcNow)
            return BadRequest(new { message = "Thời gian bắt đầu không được ở quá khứ." });

        if (dto.StartAt >= dto.EndAt)
            return BadRequest(new { message = "Thời gian thuê không hợp lệ." });

        var customerId = GetUserId();

        var existingBooking = await _db.Bookings.AnyAsync(x =>
        x.CustomerId == customerId &&
        x.CarId == dto.CarId &&
        (x.Status == BookingStatus.Pending ||
        x.Status == BookingStatus.Approved ||
        x.Status == BookingStatus.Confirmed));

        if (existingBooking)
        {
            return BadRequest(new
            {
                message = "Bạn đã có một yêu cầu thuê hoặc một chuyến đi đang diễn ra với xe này. Vui lòng hoàn thành hoặc hủy đơn cũ trước khi đặt lại."
            });
        }

        var car = await _db.Cars.FirstOrDefaultAsync(x => x.Id == dto.CarId && x.IsAvailable);
        if (car == null)
            return NotFound(new { message = "Xe không tồn tại hoặc hiện đang bị khóa." });

        var isOverlapped = await _db.Bookings.AnyAsync(b =>
            b.CarId == dto.CarId &&
           (b.Status == BookingStatus.Pending ||
            b.Status == BookingStatus.Approved ||
            b.Status == BookingStatus.Confirmed) &&
            dto.StartAt < b.EndAt &&
            dto.EndAt > b.StartAt);

        if (isOverlapped)
            return BadRequest(new { message = "Xe đã có lịch được đặt trong khoảng thời gian này." });

        // 4. Kiểm tra thông tin người dùng
        var customer = await _db.AppUsers.FirstOrDefaultAsync(x => x.Id == customerId);

        if (customer == null)
            return Unauthorized(new { message = "Không tìm thấy thông tin người thuê." });

        var owner = await _db.AppUsers.FirstOrDefaultAsync(x => x.Id == car.OwnerId);
        if (owner == null)
            return BadRequest(new { message = "Không tìm thấy chủ xe." });

        if (owner.Id == customerId)
            return BadRequest(new { message = "Bạn không thể tự thuê xe của chính mình." });

        var rentalDays = (decimal)(dto.EndAt - dto.StartAt).TotalDays;
        if (rentalDays < 1) rentalDays = 1; // Tính tối thiểu 1 ngày 

        // Tính tổng tiền dựa trên giá thuê, bảo hiểm, số ngày và giảm giá
        var calculatedTotal = (car.PricePerDay + dto.InsurancePerDay) * (decimal)Math.Ceiling(rentalDays) - dto.DiscountAmount;

        var booking = new Booking
        {
            Id = Guid.NewGuid(),
            CarId = car.Id,
            CustomerId = customer.Id,
            OwnerId = owner.Id,

            StartAt = dto.StartAt,
            EndAt = dto.EndAt,

            PickupType = dto.PickupType,
            PickupAddress = string.IsNullOrWhiteSpace(dto.PickupAddress)
                ? car.Address
                : dto.PickupAddress.Trim(),

            Note = string.IsNullOrWhiteSpace(dto.Note) ? null : dto.Note.Trim(),

            PricePerDay = dto.PricePerDay,
            InsurancePerDay = dto.InsurancePerDay,
            RentalDays = (int)Math.Ceiling(rentalDays),
            DiscountAmount = dto.DiscountAmount,
            TotalAmount = calculatedTotal,

            RentalPapers = dto.RentalPapers,
            Collateral = dto.Collateral,

            CarNameSnapshot = $"{car.Brand} {car.Model} {car.Year}",
            CarLicensePlateSnapshot = car.LicensePlate,

            CustomerNameSnapshot = customer.FullName,
            OwnerNameSnapshot = owner.FullName,

            CustomerAgreedTerms = true,
            CustomerAgreedAt = DateTime.UtcNow,
            CustomerAgreementReason = "Tôi đồng ý thuê xe",

            OwnerAgreedTerms = false,
            OwnerAgreedAt = null,
            OwnerAgreementReason = null,

            Status = BookingStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        booking.ContractSnapshot = BuildContractSnapshot(booking);

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            booking.Id,
            message = "Đã gửi yêu cầu thuê xe."
        });
    }

    // GET /api/bookings/my
    [HttpGet("my")]
    public async Task<IActionResult> GetMyBookings()
    {
        var customerId = GetUserId();
        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var data = await _db.Bookings
            .AsNoTracking()
            .Where(x => x.CustomerId == customerId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new
            {
                x.Id,
                x.CarId,
                x.CarNameSnapshot,
                x.CarLicensePlateSnapshot,
                x.StartAt,
                x.EndAt,
                x.TotalAmount,
                x.Status,
                x.CreatedAt,

                // tên chủ xe
                x.OwnerNameSnapshot,

                // ảnh xe
                Thumbnail = _db.CarImages
                    .Where(i => i.CarId == x.CarId && (int)i.Type >= 0 && (int)i.Type <= 3)
                    .OrderBy(i => i.Type)
                    .ThenBy(i => i.SortOrder)
                    .Select(i => i.Url)
                    .FirstOrDefault(),

                // link pdf hợp đồng
                ContractPdfUrl = _db.RentalAgreements
                    .Where(r => r.BookingId == x.Id)
                    .Select(r => r.PdfUrl)
                    .FirstOrDefault()
            })
            .ToListAsync();

        var result = data.Select(x => new
        {
            x.Id,
            x.CarId,
            x.CarNameSnapshot,
            x.CarLicensePlateSnapshot,
            x.StartAt,
            x.EndAt,
            x.TotalAmount,
            Status = x.Status.ToString(),
            x.CreatedAt,
            OwnerName = x.OwnerNameSnapshot,

            Thumbnail = string.IsNullOrWhiteSpace(x.Thumbnail)
                ? null
                : (x.Thumbnail.StartsWith("http")
                    ? x.Thumbnail
                    : $"{baseUrl}{x.Thumbnail}"),

            ContractPdfUrl = string.IsNullOrWhiteSpace(x.ContractPdfUrl)
                ? null
                : (x.ContractPdfUrl.StartsWith("http")
                    ? x.ContractPdfUrl
                    : $"{baseUrl}{x.ContractPdfUrl}")
        });

        return Ok(result);
    }

    // GET /api/bookings/owner
    [HttpGet("owner")]
    public async Task<IActionResult> GetOwnerBookings()
    {
        var ownerId = GetUserId();
        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var data = await _db.Bookings
            .AsNoTracking()
            .Where(x => x.OwnerId == ownerId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new
            {
                x.Id,
                x.CarId,
                x.CarNameSnapshot,
                x.CarLicensePlateSnapshot,
                x.CustomerNameSnapshot,
                x.StartAt,
                x.EndAt,
                x.TotalAmount,
                x.Status,
                x.CreatedAt,
                x.Note,

                Thumbnail = _db.CarImages
                    .Where(i => i.CarId == x.CarId && (int)i.Type >= 0 && (int)i.Type <= 3)
                    .OrderBy(i => i.Type)
                    .ThenBy(i => i.SortOrder)
                    .Select(i => i.Url)
                    .FirstOrDefault()
            })
            .ToListAsync();

        var result = data.Select(x => new
        {
            x.Id,
            x.CarId,
            x.CarNameSnapshot,
            x.CarLicensePlateSnapshot,
            x.CustomerNameSnapshot,
            x.StartAt,
            x.EndAt,
            x.TotalAmount,
            x.Status,
            x.CreatedAt,
            x.Note,
            Thumbnail = string.IsNullOrWhiteSpace(x.Thumbnail)
                ? null
                : $"{baseUrl}{x.Thumbnail}"
        });

        return Ok(result);
    }

    // GET /api/bookings/{id}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetBookingDetail(Guid id)
    {
        var userId = GetUserId();
        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var booking = await _db.Bookings
            .AsNoTracking()
            .Where(x => x.Id == id && (x.CustomerId == userId || x.OwnerId == userId))
            .Select(x => new
            {
                x.Id,
                x.CarId,
                x.CarNameSnapshot,
                x.CarLicensePlateSnapshot,
                x.CustomerNameSnapshot,
                x.OwnerNameSnapshot,
                x.StartAt,
                x.EndAt,
                x.PickupAddress,
                x.PickupType,
                x.Note,
                x.PricePerDay,
                x.InsurancePerDay,
                x.RentalDays,
                x.DiscountAmount,
                x.TotalAmount,
                x.RentalPapers,
                x.Collateral,
                x.ContractSnapshot,
                x.Status,
                x.CreatedAt,
                x.CustomerAgreedTerms,
                x.CustomerAgreedAt,
                x.CustomerAgreementReason,
                x.OwnerAgreedTerms,
                x.OwnerAgreedAt,
                x.OwnerAgreementReason,

                ContractPdfUrl = _db.RentalAgreements
                    .Where(r => r.BookingId == x.Id)
                    .Select(r => r.PdfUrl)
                    .FirstOrDefault()
            })
            .FirstOrDefaultAsync();

        if (booking == null)
            return NotFound(new { message = "Không tìm thấy đơn thuê." });

        return Ok(new
        {
            booking.Id,
            booking.CarId,
            booking.CarNameSnapshot,
            booking.CarLicensePlateSnapshot,
            booking.CustomerNameSnapshot,
            booking.OwnerNameSnapshot,
            booking.StartAt,
            booking.EndAt,
            booking.PickupAddress,
            booking.PickupType,
            booking.Note,
            booking.PricePerDay,
            booking.InsurancePerDay,
            booking.RentalDays,
            booking.DiscountAmount,
            booking.TotalAmount,
            booking.RentalPapers,
            booking.Collateral,
            booking.ContractSnapshot,
            Status = booking.Status.ToString(),
            booking.CreatedAt,
            booking.CustomerAgreedTerms,
            booking.CustomerAgreedAt,
            booking.CustomerAgreementReason,
            booking.OwnerAgreedTerms,
            booking.OwnerAgreedAt,
            booking.OwnerAgreementReason,

            ContractPdfUrl = string.IsNullOrWhiteSpace(booking.ContractPdfUrl)
                ? null
                : (booking.ContractPdfUrl.StartsWith("http")
                    ? booking.ContractPdfUrl
                    : $"{baseUrl}{booking.ContractPdfUrl}")
        });
    }

    // POST /api/bookings/{id}/approve
    [HttpPost("{id:guid}/approve")]
    public async Task<IActionResult> ApproveBooking(Guid id)
    {
        var ownerId = GetUserId();

        // Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu
        using var transaction = await _db.Database.BeginTransactionAsync();
        try
        {
            var booking = await _db.Bookings
                .Include(b => b.Car) // Load thông tin xe để kiểm tra
                .FirstOrDefaultAsync(x => x.Id == id && x.OwnerId == ownerId);

            if (booking == null)
                return NotFound(new { message = "Không tìm thấy đơn thuê." });

            if (booking.Status != BookingStatus.Pending)
                return BadRequest(new { message = "Chỉ có thể duyệt đơn đang ở trạng thái chờ." });

            // --- BỔ SUNG QUAN TRỌNG: CHECK LẠI TRÙNG LỊCH TRƯỚC KHI DUYỆT ---
            var isStillAvailable = !await _db.Bookings.AnyAsync(b =>
                b.CarId == booking.CarId &&
                b.Id != booking.Id && // Không tự check chính nó
                (b.Status == BookingStatus.Approved || b.Status == BookingStatus.Confirmed) &&
                booking.StartAt < b.EndAt &&
                booking.EndAt > b.StartAt);

            if (!isStillAvailable)
            {
                return BadRequest(new { message = "Không thể duyệt vì lịch xe đã bị trùng với một đơn khác vừa được xác nhận." });
            }

            // Cập nhật thông tin phê duyệt
            booking.OwnerAgreedTerms = true;
            booking.OwnerAgreedAt = DateTime.UtcNow;
            booking.OwnerAgreementReason = "Tôi đồng ý cho thuê xe";
            booking.Status = BookingStatus.Approved;

            // Build lại snapshot vì lúc này đã có thông tin OwnerAgreedAt
            booking.ContractSnapshot = BuildContractSnapshot(booking);

            // Xử lý RentalAgreement 
            var contractNumber = GenerateContractNumber(booking.Id);
            var pdfUrl = await _pdfService.GenerateAsync(booking);

            var agreement = await _db.RentalAgreements
                .FirstOrDefaultAsync(x => x.BookingId == booking.Id);

            if (agreement == null)
            {
                agreement = new RentalAgreement
                {
                    Id = Guid.NewGuid(),
                    BookingId = booking.Id,
                    AgreementContent = booking.ContractSnapshot,
                    CustomerAccepted = booking.CustomerAgreedTerms,
                    CustomerAcceptedAt = booking.CustomerAgreedAt,
                    OwnerAccepted = true,
                    OwnerAcceptedAt = booking.OwnerAgreedAt,
                    ContractNumber = contractNumber,
                    PdfUrl = pdfUrl,
                    CreatedAt = DateTime.UtcNow
                };
                _db.RentalAgreements.Add(agreement);
            }
            else
            {
                agreement.AgreementContent = booking.ContractSnapshot;
                agreement.OwnerAccepted = true;
                agreement.OwnerAcceptedAt = booking.OwnerAgreedAt;
                agreement.ContractNumber = contractNumber;
                agreement.PdfUrl = pdfUrl;
            }

            await _db.SaveChangesAsync();
            await transaction.CommitAsync(); // Hoàn tất giao dịch

            return Ok(new { message = "Đã duyệt đơn và tạo hợp đồng thành công.", pdfUrl });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(); // Có lỗi thì trả dữ liệu về trạng thái cũ
            return StatusCode(500, new { message = "Có lỗi xảy ra trong quá trình duyệt đơn." });
        }
    }

    // POST /api/bookings/{id}/reject
    [HttpPost("{id:guid}/reject")]
    public async Task<IActionResult> RejectBooking(Guid id)
    {
        var ownerId = GetUserId();

        var booking = await _db.Bookings.FirstOrDefaultAsync(x => x.Id == id && x.OwnerId == ownerId);
        if (booking == null)
            return NotFound(new { message = "Không tìm thấy đơn thuê." });

        if (booking.Status != BookingStatus.Pending)
            return BadRequest(new { message = "Chỉ có thể từ chối đơn đang chờ." });

        booking.Status = BookingStatus.Rejected;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã từ chối đơn thuê." });
    }

    // GET /api/bookings/owner/contracts
    [HttpGet("owner/contracts")]
    public async Task<IActionResult> GetOwnerContracts()
    {
        var ownerId = GetUserId();

        var data = await _db.RentalAgreements
            .AsNoTracking()
            .Where(x => x.Booking != null && x.Booking.OwnerId == ownerId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new
            {
                x.Id,
                x.BookingId,
                x.ContractNumber,
                x.PdfUrl,
                x.CreatedAt,
                CarName = x.Booking!.CarNameSnapshot,
                CustomerName = x.Booking.CustomerNameSnapshot,
                StartAt = x.Booking.StartAt,
                EndAt = x.Booking.EndAt,
                TotalAmount = x.Booking.TotalAmount
            })
            .ToListAsync();

        return Ok(data);
    }

    // POST /api/bookings/{id}/pick-up
    [HttpPost("{id:guid}/pick-up")]
    public async Task<IActionResult> ConfirmPickUp(Guid id)
    {
        var ownerId = GetUserId();
        var booking = await _db.Bookings.FirstOrDefaultAsync(x => x.Id == id && x.OwnerId == ownerId);

        if (booking == null)
            return NotFound(new { message = "Không tìm thấy đơn thuê." });

        if (booking.Status != BookingStatus.Approved)
            return BadRequest(new { message = "Chỉ có thể bàn giao xe cho đơn đã được duyệt trên hệ thống." });

        var originalDuration = booking.EndAt - booking.StartAt;

        // cập nhật thời gian thực tế
        booking.StartAt = DateTime.UtcNow;
        booking.EndAt = booking.StartAt.Add(originalDuration);

        // cập nhật trạng thái
        booking.Status = BookingStatus.Confirmed;

        // ghi chú
        booking.Note += $"\n[Hệ thống]: Xác nhận bàn giao thực tế. Thời gian thuê đã được điều chỉnh bắt đầu từ: {booking.StartAt.ToLocalTime():dd/MM/yyyy HH:mm}.";

        // build lại hợp đồng
        booking.ContractSnapshot = BuildContractSnapshot(booking);

        // cập nhật agreement + generate lại pdf
        var agreement = await _db.RentalAgreements
            .FirstOrDefaultAsync(x => x.BookingId == booking.Id);

        if (agreement != null)
        {
            agreement.AgreementContent = booking.ContractSnapshot;

            var pdfUrl = await _pdfService.GenerateAsync(booking);
            agreement.PdfUrl = pdfUrl;
        }

        await _db.SaveChangesAsync();

        return Ok(new
        {
            message = "Bàn giao xe thành công. Thời gian thuê bắt đầu tính từ bây giờ!",
            newStartAt = booking.StartAt,
            newEndAt = booking.EndAt
        });
    }

    // POST /api/bookings/{id}/complete
    [HttpPost("{id:guid}/complete")]
    public async Task<IActionResult> CompleteBooking(Guid id)
    {
        var ownerId = GetUserId();

        var booking = await _db.Bookings
            .FirstOrDefaultAsync(x => x.Id == id && x.OwnerId == ownerId);

        if (booking == null)
            return NotFound(new { message = "Không tìm thấy đơn thuê." });

        if (booking.Status != BookingStatus.Confirmed)
            return BadRequest(new { message = "Chỉ có thể hoàn thành đơn thuê đang ở trạng thái 'Đang dùng'." });

        // cập nhật trạng thái
        booking.Status = BookingStatus.Completed;

        // cập nhật thời gian trả thực tế
        booking.EndAt = DateTime.UtcNow;

        // ghi chú hệ thống
        booking.Note += $"\n[Hệ thống]: Xác nhận khách đã trả xe thành công vào lúc: {booking.EndAt.ToLocalTime():dd/MM/yyyy HH:mm}.";

        // build lại snapshot hợp đồng với thời gian mới
        booking.ContractSnapshot = BuildContractSnapshot(booking);

        // cập nhật agreement + generate lại pdf
        var agreement = await _db.RentalAgreements
            .FirstOrDefaultAsync(x => x.BookingId == booking.Id);

        if (agreement != null)
        {
            agreement.AgreementContent = booking.ContractSnapshot;

            var pdfUrl = await _pdfService.GenerateAsync(booking);
            agreement.PdfUrl = pdfUrl;
        }

        await _db.SaveChangesAsync();

        return Ok(new
        {
            message = "Đã xác nhận hoàn thành đơn thuê. Xe đã được bàn giao lại cho chủ xe.",
            status = booking.Status
        });
    }
}