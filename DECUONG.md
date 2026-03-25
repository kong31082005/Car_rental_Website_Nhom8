# 🌐 ĐỀ CƯƠNG DỰ ÁN WEB NÂNG CAO  
## 🚗 HỆ THỐNG THUÊ XE TỰ LÁI (CAR RENTAL WEB SYSTEM)

---

## 1. 📌 Giới thiệu

Hệ thống thuê xe tự lái là nền tảng cho phép:

- Người dùng đăng xe cho thuê  
- Khách hàng tìm kiếm và đặt xe  
- Hai bên ký hợp đồng điện tử  

Ngoài các chức năng cơ bản, hệ thống còn tích hợp:

- Yêu thích xe  
- Nhắn tin  
- Thông báo  
- Điểm thưởng và voucher  
- Đăng bài cộng đồng  

---

## 2. 🎯 Mục tiêu

- Xây dựng hệ thống web hoàn chỉnh  
- Mô phỏng nghiệp vụ thực tế  
- Áp dụng kiến trúc hiện đại (RESTful API)  
- Tích hợp nhiều module nâng cao:
  - Messaging  
  - Notification  
  - Reward system  

---

## 3. 🧱 Kiến trúc hệ thống
[ Web Client ] <----> [ ASP.NET Core API ] <----> [ SQL Server ]

- Frontend: ReactJS  
- Backend: ASP.NET Core  
- Database: SQL Server  

---

## 4. 👥 Vai trò người dùng

### 🔹 Customer

- Tìm kiếm xe  
- Thuê xe  
- Yêu thích xe  
- Nhắn tin với chủ xe  
- Nhận thông báo  
- Tích điểm & dùng voucher  
- Quản lý tài khoản cá nhân  
- Đăng bài, xem tin tức  

### 🔹 Owner

- Quản lý xe  
- Duyệt đơn thuê  
- Nhắn tin với khách  
- Quản lý hợp đồng  
- Quản lý tài khoản cá nhân  
- Đăng bài, xem tin tức  

---

## 5. 🔄 Các chức năng chính

### 5.1 🚗 Thuê xe

- Xem danh sách xe  
- Xem chi tiết xe  
- Đặt thuê xe  
- Xem hợp đồng  
- Theo dõi trạng thái  

---

### 5.2 ❤️ Xe yêu thích (Favorite Cars)

Người dùng có thể:

- Thêm xe vào danh sách yêu thích  
- Xóa khỏi danh sách  

Dữ liệu lưu:

- `UserId + CarId (unique)`

👉 Giúp:

- Tăng trải nghiệm người dùng  
- Gợi ý xe sau này  

---

### 5.3 💬 Nhắn tin (Messaging System)

Chat giữa:

- Khách thuê ↔ Chủ xe  

Chức năng:

- Tạo cuộc hội thoại  
- Gửi / nhận tin nhắn  
- Lưu lịch sử chat  

Cấu trúc:

- Conversation  
- ConversationParticipant  
- Message  

---

### 5.4 🔔 Thông báo (Notification System)

Hệ thống gửi thông báo khi:

- Có đơn thuê mới  
- Đơn được duyệt / từ chối  
- Có tin nhắn mới  

Loại thông báo:

- Booking  
- Message  
- System  

---

### 5.5 📄 Hợp đồng điện tử

- Sinh tự động khi duyệt đơn  

Hiển thị:

- Text preview  
- PDF  

Bao gồm:

- Thông tin xe  
- Thông tin thuê  
- Chi phí  
- Chữ ký điện tử 2 bên  

---

### 5.6 👤 Quản lý tài khoản

- Xem / sửa thông tin cá nhân  
- Đổi mật khẩu  
- Xem lịch sử thuê xe  
- Xem điểm thưởng  

---

### 5.7 📝 Đăng bài (Community / Post)

Người dùng có thể:

- Đăng bài  
- Like  
- Comment  

Mục đích:

- Tăng tương tác  
- Xây dựng cộng đồng  

---

### 5.8 🎁 Điểm thưởng & Voucher

Cơ chế:

- Người dùng nhận điểm khi:
  - Hoàn thành chuyến thuê  

Điểm có thể:

- Quy đổi thành voucher  

Ứng dụng:

- Giảm giá khi thuê xe  
- Tăng giữ chân người dùng  

---

## 6. 🧾 Thiết kế database

Các bảng chính:

- AppUser  
- Car  
- Booking  
- RentalAgreement  
- FavoriteCar  
- Conversation  
- Message  
- Notification  
- Post  
- PostLike  
- PostComment  

---

## 7. 📊 Trạng thái đơn thuê

| Status      | Ý nghĩa        |
|------------|--------------|
| Pending    | Chờ duyệt     |
| Approved   | Đã duyệt      |
| Rejected   | Từ chối       |
| InProgress | Đang thuê     |
| Completed  | Hoàn thành    |

---

## 8. 🔐 Xác nhận điện tử

- Khách thuê:
  - Tick đồng ý hợp đồng  

- Chủ xe:
  - Duyệt đơn = ký hợp đồng  

---

## 9. 🖥️ Giao diện hệ thống

### 🔹 Customer

- Home  
- Car Detail  
- Booking  
- Contract  
- Favorite Cars  
- Messages  
- Notifications  
- Profile  

### 🔹 Owner

- My Cars  
- Booking Management  
- Contract Management  
- Messages  

---

## 10. 🧩 Công nghệ sử dụng

| Thành phần | Công nghệ |
|----------|---------|
| Frontend | ReactJS |
| Backend | ASP.NET Core |
| Database | SQL Server |
| ORM | Entity Framework Core |
| Auth | JWT |
| PDF | PDF Service |
| Realtime (optional) | SignalR |

---

## 11. 🚀 Điểm nổi bật

- Full flow thuê xe thực tế  
- Hợp đồng điện tử + chữ ký  
- Hệ thống chat nội bộ  
- Notification system  
- Reward system (voucher)  
- Social features (post, like, comment)  

---

## 12. 🔮 Hướng phát triển

- Thanh toán online  
- AI gợi ý xe  
- Bản đồ (map tracking)  
- Ký số (digital signature thật)  
- Push notification  

---

## 13. 📌 Kết luận

Hệ thống không chỉ giải quyết bài toán thuê xe
mà còn mở rộng thành một nền tảng dịch vụ hoàn chỉnh
kết hợp thương mại, giao tiếp và trải nghiệm người dùng.
