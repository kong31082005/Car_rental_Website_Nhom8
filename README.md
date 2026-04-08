# 🚗 CAR RENTAL WEB SYSTEM
## 🌐 Dự án môn học: Web Nâng Cao

Hệ thống thuê xe tự lái được xây dựng theo mô hình **Web Client - RESTful API - Database**.  
Dự án hỗ trợ các nghiệp vụ chính như: tìm kiếm xe, đặt thuê xe, quản lý xe, hợp đồng điện tử, nhắn tin, thông báo, yêu thích xe, điểm thưởng và quản trị hệ thống.

---

## 👥 Thành viên thực hiện

| STT | Họ và tên | Mã sinh viên | Chức vụ |
|-----|-----------|--------------|---------|
| 1 | Nguyễn Văn Công | 23810310128 | Nhóm trưởng |
| 2 | Vũ Trường Giang | 23810310117 | Thành viên |

---

## 📋 Mục lục
- [Tổng quan dự án](#-tổng-quan-dự-án)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cơ sở dữ liệu](#-cơ-sở-dữ-liệu)
- [SRS Documents](#-srs-documents)
- [Đề cương chức năng](#-đề-cương-chức-năng)
- [Báo cáo tiến độ](#-báo-cáo-tiến-độ)
- [UI / Demo](#-ui--demo)
- [Chức năng chính của hệ thống](#-chức-năng-chính-của-hệ-thống)
- [Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [Hướng phát triển](#-hướng-phát-triển)
- [Ghi chú](#-ghi-chú)

## 📌 Tổng quan dự án

### Mục tiêu
- Xây dựng website thuê xe tự lái theo nghiệp vụ thực tế
- Áp dụng kiến trúc RESTful API
- Phân quyền theo vai trò người dùng
- Hỗ trợ tài liệu đặc tả SRS cho từng chức năng
- Theo dõi tiến độ thực hiện qua từng báo cáo

### Vai trò người dùng
- **Customer**: tìm kiếm xe, đặt thuê xe, xem hợp đồng, nhắn tin, yêu thích xe, nhận thông báo, tích điểm
- **Admin**: quản lý người dùng, quản lý xe, quản lý hợp đồng, quản lý bài viết, quản lý voucher, giám sát hệ thống

---

## 🛠 Công nghệ sử dụng

| Thành phần | Công nghệ |
|-----------|-----------|
| Frontend | ReactJS |
| Backend | ASP.NET Core Web API |
| Database | SQL Server |
| ORM | Entity Framework Core |
| Authentication | JWT |
| Realtime | SignalR |
| Contract Export | PDF Service |

---

## 📁 Cấu trúc thư mục

> Sẽ cập nhật sau khi hoàn thiện cấu trúc source code chính thức.

    [Đang cập nhật...]

---

## 🗄 Cơ sở dữ liệu

> Sẽ cập nhật sau khi hoàn thiện thiết kế database và lược đồ quan hệ.

    [Đang cập nhật...]

---

## 📄 SRS Documents

| Chức năng | Người thực hiện | Ngày | Link |
|----------|----------------|------|------|
| Login | Nguyễn Văn Công | 25/03/2026 | [Xem](./docs/SRS_LOGIN.md) |
| Search Car | Nguyễn Văn Công | 03/04/2026 | [Xem](./docs/SRS_SEARCH_CAR.md) |
| Register | Vũ Trường Giang | 03/04/2026 | [Xem](./docs/SRS_REGISTER.md) |
| Add Car | Vũ Trường Giang | 03/04/2026 | [Xem](./docs/SRS_ADD_CAR.md) |
| Car Controller | Vũ Trường Giang | 03/04/2026 | [Xem](./docs/SRS_CAR_CONTROLLER.md) |

---

## 📑 Đề cương chức năng

| Tài liệu | Mô tả | Link |
|---------|------|------|
| Đề cương dự án | Mô tả tổng quan hệ thống, actor, chức năng chính, công nghệ, hướng phát triển | [Xem](./docs/DECUONG.md) |

---

## 📈 Báo cáo tiến độ

| Báo cáo | Nội dung | Link |
|--------|----------|------|
| Progress Report | Nhật ký tiến độ thực hiện dự án theo từng giai đoạn | [Xem](./reports/) |

---

## 🎨 UI / Demo

| Chức năng | Người thực hiện | Mô tả | Link |
|----------|----------------|------|------|
| Login UI | Nguyễn Văn Công | Giao diện đăng nhập (React + Bootstrap) | [Xem](./docs/images_demo/login-ui.png) |

---

## 🚀 Chức năng chính của hệ thống

### Customer
- Đăng ký / Đăng nhập
- Tìm kiếm xe
- Xem chi tiết xe
- Đặt thuê xe
- Xem hợp đồng
- Yêu thích xe
- Nhắn tin với Admin
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
- Nhắn tin với khách hàng
- Giám sát toàn hệ thống

---

## 🚀 Hướng dẫn cài đặt

### 🔧 Yêu cầu hệ thống
- Node.js
- .NET SDK
- SQL Server
- Git

---

### 📥 1. Clone project

    git clone <repo-url>
    cd <project-folder>

---

### ⚙️ 2. Cài đặt Backend

    cd backend
    dotnet restore
    dotnet ef database update
    dotnet run

---

### 🎨 3. Cài đặt Frontend

    cd frontend
    npm install
    npm start

---

## 🧭 Hướng phát triển

- Thanh toán online
- AI gợi ý xe
- Tích hợp bản đồ
- Push notification
- Ký số nâng cao cho hợp đồng điện tử

---

## 📬 Ghi chú

- Các tài liệu SRS được đặt trong thư mục `docs/`
- Báo cáo tiến độ được đặt trong thư mục `reports/`
- Cấu trúc thư mục và cơ sở dữ liệu sẽ được cập nhật sau khi hoàn thiện source code chính thức