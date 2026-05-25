# 🚗 CAR RENTAL WEB SYSTEM
## 🌐 Dự án môn học: Web Nâng Cao

Hệ thống thuê xe tự lái được xây dựng theo mô hình **Web Client - RESTful API - Database**.  
Dự án hỗ trợ các nghiệp vụ chính như: tìm kiếm xe, đặt thuê xe, thanh toán online, hợp đồng điện tử, yêu thích xe, thông báo, điểm thưởng, voucher và quản trị hệ thống.

---

## 👥 Danh sách thành viên & Phân công nhiệm vụ

| STT | Họ và tên | MSSV | Chức vụ | Phân công nhiệm vụ và Giao diện (UI) đảm nhiệm |
|-----|-----------|------|---------|------------------------------------------------|
| 1 | **Nguyễn Văn Công** | 23810310128 | **Nhóm trưởng** | **Kiến trúc & Hệ thống:**<br>• Thiết lập kiến trúc tổng thể hệ thống (RESTful API), thiết kế cấu trúc thư mục dự án và thiết kế Cơ sở dữ liệu SQL Server.<br>• Cấu hình hệ thống xác thực bảo mật Token JWT tại Backend.<br><br>**Phát triển Chức năng & Giao diện (UI) phía Khách hàng:**<br>• **UI Trang chủ khách hàng (Home UI):** Thiết kế banner, bố cục điều hướng và danh mục xe nổi bật.<br>• **UI & Logic Đăng nhập / Đăng ký (Login/Register):** Form xác thực tài khoản người dùng.<br>• **UI & Logic Tìm kiếm & Bộ lọc (Search Car):** Bộ lọc nâng cao theo hãng, giá, loại nhiên liệu, hộp số.<br>• **UI & Logic Chi tiết xe (Car Detail):** Hiển thị thông số kỹ thuật, giá thuê, album ảnh xe.<br>• **UI & Luồng Đặt thuê xe (Booking Request):** Form chọn ngày giờ nhận/trả xe và áp dụng mã giảm giá.<br>• **UI & Tính năng Xe yêu thích (Favorite Cars):** Lưu trữ danh sách xe khách hàng quan tâm.<br>• **UI Trang giới thiệu (About Us):** Thông tin thương hiệu Kongcars.<br><br>**Phát triển Phân hệ Tính năng nâng cao (Backend & Frontend):**<br>• **UI & Logic Mạng xã hội/Tin tức (Post):** Tính năng đăng bài viết chia sẻ kinh nghiệm, tương tác thả tim (`PostLike`) và bình luận (`PostComment`).<br>• **UI & Logic Quản lý Voucher & Điểm thưởng:** Hệ thống tích điểm tự động sau mỗi chuyến đi, danh sách Voucher công khai.<br>• **UI & Logic Đổi thưởng (Reward Redeem):** Kho quà đổi điểm lấy voucher cá nhân.<br>• **UI & Logic Vòng quay may mắn (Reward Lucky Spin):** Tính năng trò chơi tiêu điểm thưởng để trúng quà ngẫu nhiên.<br>• **UI Center Thông báo (Notification):** Hệ thống nhận thông báo biến động trạng thái từ hệ thống gửi về cho khách hàng. |
| 2 | **Vũ Trường Giang** | 23810310117 | **Thành viên** | **Triển khai & Vận hành:**<br>• Cấu hình môi trường, quản lý tệp cấu hình hệ thống (`appsettings.json`, `launchSettings.json`).<br>• Đảm nhiệm cấu hình hệ thống và triển khai (Deploy) toàn bộ ứng dụng lên môi trường Cloud (Vercel cho Frontend, dịch vụ Cloud cho Backend/Database).<br><br>**Phát triển Chức năng & Giao diện (UI) phía Quản trị (Admin):**<br>• **UI Trang chủ Admin (Admin Dashboard):** Thống kê doanh thu, số lượng đơn đặt xe, biểu đồ tổng quan hệ thống.<br>• **UI & Logic Quản lý xe (CRUD Car):** Form thêm xe mới, sửa thông tin, xóa xe và quản lý bộ sưu tập ảnh xe (`CarImage`).<br>• **UI & Logic Quản lý người dùng (User Management):** Danh sách tài khoản, phân quyền Customer/Admin.<br><br>**Phát triển Luồng xử lý nghiệp vụ cốt lõi (Backend & Frontend):**<br>• **UI & Logic Quản lý đơn thuê (Booking Management):** Hệ thống tiếp nhận, xử lý chuyển đổi trạng thái đơn hàng (Chờ duyệt -> Đã duyệt -> Hoàn thành).<br>• **UI & Logic Thanh toán trực tuyến (Payment System):** Tích hợp cổng thanh toán thực tế **PayOS API**; Xử lý tạo cổng QR Code tự động trên UI và cấu hình Webhook đón trạng thái giao dịch để cập nhật đơn hàng thành "Đã thanh toán".<br>• **UI & Dịch vụ Hợp đồng điện tử (Rental Agreement):** Tích hợp dịch vụ kết xuất tài liệu, tự động sinh và hiển thị file Hợp đồng điện tử định dạng PDF trực quan trên giao diện sau khi thanh toán thành công.<br>• **UI Quản lý tài khoản cá nhân (Profile):** Giao diện cập nhật thông tin cá nhân, thay đổi mật khẩu của người dùng. |

---
## 🔗 Thông tin dự án
* **Link Website Online:** [https://car-rentalweb.vercel.app/home]
* 
---

## 🔐 Tài khoản Demo
* **Tài khoản Admin:** `vutruonggiang0811@gmail.com ` / **Mật khẩu:** `Giang0811`
* **Khách hàng:** `vutruonggiang1108@gmail.com ` / **Mật khẩu:** `Giang0811` - Có thể đăng ký tài khoản mới trực tiếp trên website.

---

## 📋 Mục lục

- [Tổng quan dự án](#-tổng-quan-dự-án)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Cơ sở dữ liệu](#-cơ-sở-dữ-liệu)
- [SRS Documents](#-srs-documents)
- [Đề cương chức năng](#-đề-cương-chức-năng)
- [Báo cáo tiến độ](#-báo-cáo-tiến-độ)
- [UI / Demo](#-ui--demo)
- [Chức năng chính](#-chức-năng-chính)
- [Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [Hướng phát triển](#-hướng-phát-triển)
- [Ghi chú](#-ghi-chú)

---

## 📌 Tổng quan dự án

### 🎯 Mục tiêu

- Xây dựng hệ thống thuê xe theo nghiệp vụ thực tế
- Áp dụng kiến trúc RESTful API
- Phân quyền rõ ràng theo vai trò người dùng
- Tích hợp thanh toán online qua PayOS
- Viết tài liệu SRS cho từng chức năng
- Theo dõi tiến độ thực hiện qua các báo cáo

### 👥 Vai trò người dùng

| Vai trò | Mô tả |
|--------|------|
| Customer | Tìm kiếm xe, đặt xe, thanh toán, sử dụng voucher |
| Admin | Quản lý hệ thống, xe, hợp đồng, voucher |

---

## 🛠 Công nghệ sử dụng

| Thành phần | Công nghệ |
|-----------|-----------|
| Frontend | ReactJS (Vite) |
| Backend | ASP.NET Core Web API |
| Database | SQL Server |
| ORM | Entity Framework Core |
| Authentication | JWT |
| Payment | PayOS |
| Contract Export | PDF Service |

---

## 📁 Cấu trúc thư mục

    Car_rental_Website_Nhom8/
    ├── backend/                     # ASP.NET Core API
    │   ├── Controllers/             # API endpoints
    │   ├── Services/                # Business logic
    │   ├── Repositories/            # Data access
    │   ├── Models/                  # Entity & DTO
    │   ├── Data/                    # DbContext
    │   ├── Migrations/              # Database migrations
    │   ├── Helpers/                 # Helper functions
    │   ├── wwwroot/                 # Static files
    │   ├── Program.cs               # Entry point
    │   └── appsettings.json         # Config
    │
    ├── frontend/                    # ReactJS Client
    │   ├── src/
    │   │   ├── screens/             # Pages
    │   │   ├── components/          # UI components
    │   │   ├── services/            # API calls
    │   │   └── assets/              # Images, styles
    │   ├── public/
    │   └── package.json
    │
    ├── docs/                        # 📄 SRS + Đề cương
    ├── reports/                     # 📊 Báo cáo tiến độ
    ├── README.md
    └── DECUONG.md

---

## 🧱 Kiến trúc hệ thống

    [ React Frontend ]
            ↓
    [ ASP.NET Core API ]
            ↓
    [ SQL Server Database ]

### 🔄 Luồng xử lý

1. Frontend gửi request đến backend
2. Backend xử lý theo luồng Controller → Service → Repository
3. Database trả dữ liệu
4. Backend trả về JSON response
5. Frontend hiển thị dữ liệu cho người dùng

---

## 🗄 Cơ sở dữ liệu

### 📋 Danh sách bảng chính

| Bảng | Mô tả |
|------|------|
| AppUser | Thông tin người dùng |
| Car | Thông tin xe |
| CarImage | Ảnh xe |
| Booking | Đơn thuê xe |
| RentalAgreement | Hợp đồng thuê xe |
| FavoriteCar | Xe yêu thích |
| Voucher | Voucher khuyến mãi / voucher đổi thưởng |
| Payment | Thông tin thanh toán |
| Notification | Thông báo hệ thống |
| Post | Bài viết cộng đồng |
| PostLike | Lượt thích bài viết |
| PostComment | Bình luận bài viết |

### 🔗 Quan hệ chính

- `AppUser` 1 - N `Car`
- `AppUser` 1 - N `Booking`
- `Car` 1 - N `Booking`
- `Booking` 1 - 1 `RentalAgreement`
- `AppUser` 1 - N `FavoriteCar`
- `AppUser` 1 - N `Voucher` (voucher cá nhân sau khi đổi thưởng)
- `AppUser` 1 - N `Notification`
- `Post` 1 - N `PostComment`
- `Post` 1 - N `PostLike`

### 📌 Ghi chú nghiệp vụ

- Một người dùng chỉ được yêu thích một xe một lần
- Một đơn thuê chỉ được xác nhận sau khi thanh toán thành công
- Voucher gồm 2 loại:
  - Voucher public
  - Voucher redeem bằng điểm
- Hợp đồng PDF được tạo hoặc cập nhật sau các bước xử lý nghiệp vụ cần thiết

---

## 📄 SRS Documents

| Chức năng | Người thực hiện | Ngày | Link |
|----------|----------------|------|------|
| Login | Nguyễn Văn Công | 25/03/2026 | [Xem](./docs/SRS_LOGIN.md) |
| Search Car | Nguyễn Văn Công | 03/04/2026 | [Xem](./docs/SRS_SEARCH_CAR.md) |
| Register | Vũ Trường Giang | 03/04/2026 | [Xem](./docs/SRS_REGISTER.md) |
| Add Car | Vũ Trường Giang | 03/04/2026 | [Xem](./docs/SRS_ADD_CAR.md) |
| Car Controller | Vũ Trường Giang | 03/04/2026 | [Xem](./docs/SRS_CAR_CONTROLLER.md) |
| Favorite Car | Nguyễn Văn Công | 11/04/2026 | [Xem](./docs/SRS_FAVORITE_CAR.md) |
| Reward Redeem | Nguyễn Văn Công | 12/04/2026 | [Xem](./docs/SRS_REWARD_REDEEM_CAR.md) |
| Voucher Management | Nguyễn Văn Công | 12/04/2026 | [Xem](./docs/SRS_VOUCHER_MANAGEMENT_CAR.md) |
| Payment PayOS | Vũ Trường Giang | 22/04/2026 | [Xem](./docs/SRS_PAYMENT_PAYOS.md) |
| Notification | Nguyễn Văn Công | 22/04/2026 | [Xem](./docs/SRS_NOTIFICATION.md) |
| Post | Nguyễn Văn Công | 22/04/2026 | [Xem](./docs/SRS_POST.md) |

---

## 📑 Đề cương chức năng

| Tài liệu | Mô tả | Link |
|---------|------|------|
| Đề cương dự án | Mô tả tổng quan hệ thống, actor, chức năng chính, công nghệ, hướng phát triển | [Xem](./docs/DECUONG.md) |

---

## 📈 Báo cáo tiến độ

| Báo cáo | Nội dung | Link |
|--------|----------|------|
| Progress Report | Nhật ký tiến độ thực hiện dự án | [Xem](./reports/) |

---

## 🎨 UI / Demo

| Chức năng | Người thực hiện | Mô tả | Link |
|----------|----------------|------|------|
| Login UI | Nguyễn Văn Công | Giao diện đăng nhập | [Xem](./docs/images_demo/login-ui.png) |

---

## 🚀 Chức năng chính

### Customer

- Đăng ký / Đăng nhập
- Tìm kiếm xe
- Xem chi tiết xe
- Đặt thuê xe
- Thanh toán online qua PayOS
- Xem hợp đồng
- Yêu thích xe
- Nhận thông báo
- Quản lý tài khoản
- Tích điểm và sử dụng voucher
- Đăng bài và tương tác cộng đồng

### Admin

- Quản lý người dùng
- Quản lý xe
- Duyệt / từ chối đơn thuê
- Quản lý hợp đồng
- Quản lý bài viết
- Quản lý voucher
- Quản lý thanh toán
- Giám sát toàn hệ thống

---

## 🚀 Hướng dẫn cài đặt

### 🔧 Yêu cầu hệ thống

- Node.js
- .NET SDK
- SQL Server
- Git

### 📥 1. Clone project

    git clone <repo-url>
    cd <project-folder>

### ⚙️ 2. Cài đặt Database

- Tạo database SQL Server
- Cập nhật chuỗi kết nối trong `backend/appsettings.json`

Ví dụ:

    "ConnectionStrings": {
      "DefaultConnection": "Server=YOUR_SERVER;Database=CarRentalDb;Trusted_Connection=True;TrustServerCertificate=True;"
    }

### ⚙️ 3. Cấu hình Backend

Di chuyển vào thư mục backend:

    cd backend

Khôi phục package:

    dotnet restore

Chạy migration:

    dotnet ef database update

Cấu hình JWT trong `appsettings.json`:

    "Jwt": {
      "Key": "your-secret-key",
      "Issuer": "CarRentalAPI",
      "Audience": "CarRentalClient"
    }

Cấu hình PayOS trong `appsettings.json`:

    "PayOS": {
      "ClientId": "your-client-id",
      "ApiKey": "your-api-key",
      "ChecksumKey": "your-checksum-key",
      "ReturnUrl": "your-return-url",
      "CancelUrl": "your-cancel-url"
    }

Chạy backend:

    dotnet run

### 🎨 4. Cài đặt Frontend

Di chuyển vào thư mục frontend:

    cd frontend

Cài package:

    npm install

Chạy frontend:

    npm run dev

### 🔐 5. Tài khoản sử dụng

#### Admin mặc định

- Email: `nguyenvancong2005vp@gmail.com`
- Password: `@Cong31082005`

#### Customer

- Khách hàng tự đăng ký tài khoản ở chức năng Register

### ⚠️ 6. Lưu ý

- Backend và Frontend chạy ở 2 môi trường riêng
- Không push các file cấu hình local hoặc secret lên Git
- Nếu chưa có tài khoản PayOS thật, có thể dùng cấu hình test / sandbox
- Sau khi thanh toán thành công, hệ thống cập nhật trạng thái đơn và xử lý hợp đồng theo nghiệp vụ

---

## 🧭 Hướng phát triển

- AI gợi ý xe
- Tích hợp bản đồ
- Push notification
- Ký số nâng cao cho hợp đồng điện tử

---

## 📬 Ghi chú

- Các tài liệu SRS được đặt trong thư mục `docs/`
- Báo cáo tiến độ được đặt trong thư mục `reports/`
- Cơ sở dữ liệu và README sẽ tiếp tục được cập nhật khi hoàn thiện thêm chức năng
