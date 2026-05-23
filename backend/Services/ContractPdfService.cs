using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using RentalCarBE.Api.Models.Entities;
using System.Text.Json;

namespace RentalCarBE.Api.Services;

public interface IContractPdfService
{
    Task<string> GenerateAsync(Booking booking);
}

public class ContractPdfService : IContractPdfService
{
    private readonly IWebHostEnvironment _env;
    private readonly IHttpContextAccessor _http;
    private readonly HttpClient _httpClient; // Inject HttpClient để gọi API Cloudinary

    public ContractPdfService(IWebHostEnvironment env, IHttpContextAccessor http)
    {
        _env = env;
        _http = http;
        _httpClient = new HttpClient();
    }

    public async Task<string> GenerateAsync(Booking booking)
    {
        // 1. Sinh file PDF ra mảng bytes trong RAM bằng QuestPDF (Không lưu xuống ổ cứng Render nữa)
        var pdfBytes = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(30);

                page.Content().Column(col =>
                {
                    col.Item().Text("HỢP ĐỒNG THUÊ XE").Bold().FontSize(20).AlignCenter();

                    col.Item().Text($"Số hợp đồng: KC-{booking.Id.ToString()[..6]}").AlignCenter();

                    col.Item().PaddingTop(10).Text($"Xe: {booking.CarNameSnapshot}");
                    col.Item().Text($"Khách thuê: {booking.CustomerNameSnapshot}");
                    col.Item().Text($"Chủ xe: {booking.OwnerNameSnapshot}");

                    col.Item().Text($"Nhận xe: {booking.StartAt:dd/MM/yyyy HH:mm}");
                    col.Item().Text($"Trả xe: {booking.EndAt:dd/MM/yyyy HH:mm}");

                    col.Item().Text($"Địa điểm: {booking.PickupAddress}");

                    col.Item().PaddingTop(10)
                        .Text($"Tổng tiền: {booking.TotalAmount:n0} VNĐ").Bold();

                    col.Item().PaddingTop(20).Text("Ký xác nhận").Bold();

                    col.Item().Row(row =>
                    {
                        row.RelativeItem().Column(c =>
                        {
                            c.Item().AlignCenter().Text("BÊN CHO THUÊ").Bold();
                            c.Item().AlignCenter().Text(booking.OwnerNameSnapshot);
                            c.Item().AlignCenter().Text(DateTime.Now.ToString("dd/MM/yyyy"));
                        });

                        row.RelativeItem().Column(c =>
                        {
                            c.Item().AlignCenter().Text("BÊN THUÊ").Bold();
                            c.Item().AlignCenter().Text(booking.CustomerNameSnapshot);
                            c.Item().AlignCenter().Text(DateTime.Now.ToString("dd/MM/yyyy"));
                        });
                    });
                });
            });
        }).GeneratePdf();

        // 2. Chuẩn bị thông tin Cloudinary dựa trên cấu hình của bạn
        string cloudName = "dn0okc5g1";
        string uploadPreset = "car_rental_upload";

        // Vì đây là file PDF (Tài liệu thô), Cloudinary yêu cầu endpoint phải kết thúc bằng /raw/upload thay vì /image/upload
        string cloudinaryUrl = $"https://api.cloudinary.com/v1_1/{cloudName}/raw/upload";

        // 3. Tạo FormData tương tự như cặp lệnh bên JavaScript của bạn
        using var formData = new MultipartFormDataContent();

        // Chuyển đổi mảng byte PDF thành Stream content để đưa vào form
        var fileContent = new ByteArrayContent(pdfBytes);
        fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");

        // Đưa file và upload_preset vào form
        formData.Add(fileContent, "file", $"contract-{booking.Id}.pdf");
        formData.Add(new StringContent(uploadPreset), "upload_preset");

        try
        {
            // 4. Gửi Request lên Cloudinary
            var response = await _httpClient.PostAsync(cloudinaryUrl, formData);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Cloudinary API trả về lỗi: {errorContent}");
            }

            // 5. Đọc kết quả JSON trả về để lấy secure_url
            var responseString = await response.Content.ReadAsStringAsync();
            using var jsonDoc = JsonDocument.Parse(responseString);

            if (jsonDoc.RootElement.TryGetProperty("secure_url", out var secureUrlProperty))
            {
                // Trả về link dạng: https://res.cloudinary.com/dn0okc5g1/raw/upload/.../contract-xxx.pdf
                return secureUrlProperty.GetString() ?? throw new Exception("Không tìm thấy đường dẫn URL.");
            }

            throw new Exception("Cấu trúc phản hồi từ Cloudinary không đúng định dạng mong muốn.");
        }
        catch (Exception ex)
        {
            // Dự phòng: Nếu Cloudinary lỗi, hệ thống ghi tạm vào thư mục tạm hệ thống để không làm sập API chính
            var tempDir = Path.Combine(Path.GetTempPath(), "contracts");
            Directory.CreateDirectory(tempDir);
            var path = Path.Combine(tempDir, $"contract-{booking.Id}.pdf");
            await File.WriteAllBytesAsync(path, pdfBytes);

            var req = _http.HttpContext?.Request;
            return $"{req?.Scheme}://{req?.Host}/contracts/contract-{booking.Id}.pdf";
        }
    }
}