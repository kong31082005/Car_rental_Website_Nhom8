# 🌐 ĐỀ CƯƠNG DỰ ÁN WEB NÂNG CAO  
## 🚗 HỆ THỐNG THUÊ XE TỰ LÁI (CAR RENTAL WEB SYSTEM)

---

## 1. 📌 Giới thiệu

Hệ thống thuê xe tự lái là nền tảng cho phép:

- Người dùng đăng xe cho thuê  
- Khách hàng tìm kiếm và đặt xe  
- Hai bên thực hiện hợp đồng điện tử  

Ngoài các chức năng cơ bản, hệ thống còn tích hợp:

- Yêu thích xe  
- Nhắn tin thời gian thực  
- Thông báo  
- Điểm thưởng & voucher  
- Hệ thống bài viết cộng đồng  

---

## 2. 🎯 Mục tiêu

- Xây dựng hệ thống web hoàn chỉnh theo mô hình thực tế  
- Áp dụng kiến trúc hiện đại (RESTful API)  
- Phân quyền rõ ràng theo vai trò  
- Tích hợp các module nâng cao:
  - Messaging  
  - Notification  
  - Reward system  
  - Admin management  

---

## 3. 🧱 Kiến trúc hệ thống
[ Web Client ] <----> [ ASP.NET Core API ] <----> [ SQL Server ]

- Frontend: ReactJS  
- Backend: ASP.NET Core  
- Database: SQL Server  

---

## 4. 👥 Vai trò người dùng

### 🔹 Admin

- Quản lý người dùng (User Management)  
- Quản lý xe (Car Management)  
- Quản lý hợp đồng (Contract Management)  
- Quản lý bài viết / tin tức  
- Quản lý voucher / khuyến mãi  
- Giám sát hệ thống  

---

### 🔹 Customer (Người thuê xe)

- Tìm kiếm xe  
- Đặt thuê xe  
- Xem hợp đồng  
- Yêu thích xe  
- Nhắn tin với chủ xe  
- Nhận thông báo  
- Tích điểm & sử dụng voucher  
- Quản lý tài khoản  
- Đăng bài, tương tác cộng đồng  

---

### 🔹 Owner (Chủ xe)

- Đăng và quản lý xe  
- Duyệt / từ chối đơn thuê  
- Quản lý hợp đồng  
- Nhắn tin với khách thuê  
- Quản lý tài khoản  
- Đăng bài, tương tác  

---

## 5. 🔄 Các chức năng chính

### 5.1 🚗 Thuê xe

- Xem danh sách xe  
- Xem chi tiết xe  
- Đặt thuê xe  
- Theo dõi trạng thái đơn  
- Xem hợp đồng  

---

### 5.2 ❤️ Xe yêu thích (Favorite Cars)

- Thêm / xóa xe yêu thích  
- Lưu trữ: `UserId + CarId (unique)`  

👉 Giúp cá nhân hóa trải nghiệm người dùng  

---

### 5.3 💬 Nhắn tin (Messaging System)

- Chat giữa Customer ↔ Owner  

Chức năng:

- Tạo cuộc hội thoại  
- Gửi / nhận tin nhắn  
- Lưu lịch sử  

Cấu trúc:

- Conversation  
- ConversationParticipant  
- Message  

---

### 5.4 🔔 Thông báo (Notification System)

Gửi thông báo khi:

- Có đơn thuê mới  
- Đơn được duyệt / từ chối  
- Có tin nhắn mới  

Loại:

- Booking  
- Message  
- System  

---

### 5.5 📄 Hợp đồng điện tử

- Tự động tạo khi đơn được duyệt  

Hiển thị:

- Nội dung hợp đồng  
- Xuất PDF  

Bao gồm:

- Thông tin xe  
- Thông tin thuê  
- Chi phí  
- Xác nhận điện tử  

---

### 5.6 👤 Quản lý tài khoản

- Cập nhật thông tin  
- Đổi mật khẩu  
- Xem lịch sử thuê  
- Xem điểm thưởng  

---

### 5.7 📝 Bài viết & cộng đồng

- Đăng bài  
- Like  
- Comment  

👉 Tăng tương tác người dùng  

---

### 5.8 🎁 Điểm thưởng & Voucher

- Nhận điểm sau mỗi lần thuê thành công  
- Đổi điểm lấy voucher  

Ứng dụng:

- Giảm giá  
- Tăng giữ chân khách hàng  

---

### 5.9 🛠️ Quản trị hệ thống (Admin Panel)

Admin có thể:

- Quản lý người dùng  
- Quản lý xe trong hệ thống  
- Quản lý hợp đồng thuê  
- Quản lý bài viết / tin tức  
- Quản lý voucher khuyến mãi  

👉 Đảm bảo hệ thống vận hành ổn định và minh bạch  

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
- Voucher  

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

- Customer:
  - Đồng ý điều khoản hợp đồng  

- Owner:
  - Duyệt đơn = xác nhận hợp đồng  

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

---

### 🔹 Owner

- My Cars  
- Booking Management  
- Contract Management  
- Messages  

---

### 🔹 Admin

- Dashboard  
- User Management  
- Car Management  
- Contract Management  
- Post Management  
- Voucher Management  

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

- Phân quyền rõ ràng (Admin - Owner - Customer)  
- Quy trình thuê xe thực tế  
- Hợp đồng điện tử  
- Chat nội bộ realtime  
- Notification system  
- Reward & voucher system  
- Social features  

---

## 12. 🔮 Hướng phát triển

- Thanh toán online  
- AI gợi ý xe  
- Tích hợp bản đồ  
- Ký số nâng cao  
- Push notification  

---

## 13. 📌 Kết luận

Hệ thống không chỉ giải quyết bài toán thuê xe  
mà còn mở rộng thành một nền tảng dịch vụ đa chức năng  
kết hợp giữa thương mại, giao tiếp và quản trị hệ thống.
