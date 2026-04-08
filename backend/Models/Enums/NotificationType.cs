namespace RentalCarBE.Api.Models.Enums;

public enum NotificationType
{
    Welcome = 0,
    BookingCreated = 1,
    BookingApproved = 2,
    BookingRejected = 3,
    BookingCancelled = 4,
    MessageReceived = 5,
    System = 6
}