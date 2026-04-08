namespace RentalCarBE.Api.Models.Enums;

public enum BookingStatus
{
    Pending = 0,        // Chờ duyệt
    Approved = 1,       // Đã duyệt, chờ khách hàng xác nhận
    Confirmed = 2,      // Đã xác nhận bởi khách hàng, chờ chủ xe chuẩn bị
    Rejected = 3,       // Từ chối
    Cancelled = 4,      // Đã hủy
    InProgress = 5,     // Đang thuê
    Completed = 6    // Hoàn tất
}