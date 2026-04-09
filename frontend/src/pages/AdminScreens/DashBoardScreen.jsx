import { useMemo, useState } from "react";

function Dashboard() {
  const brands = [
    { id: "all", name: "Tất cả", icon: "▦" },
    { id: "toyota", name: "Toyota", icon: "🚗" },
    { id: "kia", name: "KIA", icon: "🚙" },
    { id: "hyundai", name: "Hyundai", icon: "🚘" },
    { id: "ford", name: "Ford", icon: "🚐" },
  ];

  const cars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Vios",
      year: 2023,
      seats: 5,
      pricePerDay: 800000,
      image: "/images/banner-1.jpg",
    },
    {
      id: 2,
      brand: "KIA",
      model: "Sonet",
      year: 2024,
      seats: 5,
      pricePerDay: 900000,
      image: "/images/banner-2.jpg",
    },
    {
      id: 3,
      brand: "Hyundai",
      model: "Accent",
      year: 2022,
      seats: 5,
      pricePerDay: 750000,
      image: "/images/banner-3.jpeg",
    },
    {
      id: 4,
      brand: "Ford",
      model: "Everest",
      year: 2024,
      seats: 7,
      pricePerDay: 1500000,
      image: "/images/banner-1.jpg",
    },
  ];

  const orders = [
    {
      id: 1,
      carName: "Toyota Vios 2023",
      user: "Nguyễn Văn A",
      time: "08/04/2026",
      status: "Chờ duyệt",
    },
    {
      id: 2,
      carName: "KIA Sonet 2024",
      user: "Trần Thị B",
      time: "09/04/2026",
      status: "Đã xác nhận",
    },
    {
      id: 3,
      carName: "Ford Everest 2024",
      user: "Lê Văn C",
      time: "10/04/2026",
      status: "Hoàn thành",
    },
  ];

  const [selectedBrand, setSelectedBrand] = useState("all");

  const filteredCars = useMemo(() => {
    if (selectedBrand === "all") return cars;
    const brandName = brands.find((b) => b.id === selectedBrand)?.name;
    return cars.filter(
      (car) => car.brand.toLowerCase() === brandName.toLowerCase(),
    );
  }, [selectedBrand]);

  const getStatusClass = (status) => {
    if (status === "Chờ duyệt") return "status-pending";
    if (status === "Đã xác nhận") return "status-approved";
    if (status === "Hoàn thành") return "status-completed";
    return "";
  };

  return (
    <>
      <style>{`
        .welcome-card {
          background: linear-gradient(135deg, #0f172a, #1d4ed8);
          border-radius: 28px;
          padding: 32px;
          color: #fff;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }

        .welcome-card::after {
          content: "";
          position: absolute;
          right: -60px;
          top: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
        }

        .welcome-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .welcome-text {
          max-width: 720px;
          color: rgba(255,255,255,0.88);
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 22px;
          padding: 22px;
        }

        .stat-label { color: #6b7280; font-size: 0.95rem; margin-bottom: 10px; }
        .stat-value { font-size: 2rem; font-weight: 900; color: #0f172a; }
        .stat-change { margin-top: 10px; font-size: 0.92rem; font-weight: 700; color: #16a34a; }

        .section-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          padding: 22px;
          margin-bottom: 24px;
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .section-title { font-size: 1.3rem; font-weight: 800; margin: 0; }
        .section-link { color: #16a34a; font-weight: 700; cursor: pointer; }

        .brand-list { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 10px; }
        .brand-card {
          min-width: 120px;
          background: #f8fafc;
          border: 2px solid #eef2f7;
          border-radius: 18px;
          padding: 18px 14px;
          text-align: center;
          cursor: pointer;
          transition: 0.2s;
        }

        .brand-card.active { border-color: #22c55e; background: #ecfdf5; }
        .brand-icon { font-size: 1.5rem; margin-bottom: 8px; }
        .brand-name { font-weight: 800; color: #111827; }

        .car-list { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 10px; }
        .car-card {
          min-width: 270px;
          border-radius: 20px;
          background: #fff;
          border: 2px solid #eef2f7;
          overflow: hidden;
        }

        .car-image { height: 150px; width: 100%; object-fit: cover; }
        .car-body { padding: 16px; }
        .car-title { font-weight: 800; margin-bottom: 8px; }
        .car-price { color: #16a34a; font-weight: 900; margin-top: 10px; }

        .orders-table { width: 100%; border-collapse: collapse; }
        .orders-table th { text-align: left; color: #6b7280; padding: 12px; border-bottom: 1px solid #eef2f7; }
        .orders-table td { padding: 12px; border-bottom: 1px solid #eef2f7; font-weight: 600; }

        .status-pill {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 800;
        }
        .status-pending { background: #fef3c7; color: #b45309; }
        .status-approved { background: #dcfce7; color: #166534; }
        .status-completed { background: #dbeafe; color: #1d4ed8; }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="welcome-card">
        <div className="welcome-title">Xin chào, Quản trị viên</div>
        <div className="welcome-text">
          Chào mừng bạn quay trở lại hệ thống quản trị Kongcars. Tại đây bạn có
          thể quản lý các nội dung của nền tảng.
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Tổng số xe</div>
          <div className="stat-value">128</div>
          <div className="stat-change">+12 xe tháng này</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Đơn thuê mới</div>
          <div className="stat-value">24</div>
          <div className="stat-change">+8% so với hôm qua</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Người dùng</div>
          <div className="stat-value">560</div>
          <div className="stat-change">+32 tài khoản mới</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Doanh thu tạm tính</div>
          <div className="stat-value">85M</div>
          <div className="stat-change">+15% tuần này</div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-head">
          <h2 className="section-title">Hãng xe nổi bật</h2>
          <div className="section-link">Xem thêm</div>
        </div>
        <div className="brand-list">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className={`brand-card ${selectedBrand === brand.id ? "active" : ""}`}
              onClick={() => setSelectedBrand(brand.id)}
            >
              <div className="brand-icon">{brand.icon}</div>
              <div className="brand-name">{brand.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="section-head">
          <h2 className="section-title">Xe của tôi</h2>
          <div className="section-link">+ Thêm xe</div>
        </div>
        <div className="car-list">
          {filteredCars.map((car) => (
            <div className="car-card" key={car.id}>
              <img src={car.image} alt={car.model} className="car-image" />
              <div className="car-body">
                <div className="car-title">
                  {car.brand} {car.model} • {car.year}
                </div>
                <div className="car-meta">
                  <span>{car.seats} chỗ</span> • <span>Available</span>
                </div>
                <div className="car-price">
                  {car.pricePerDay.toLocaleString("vi-VN")} / ngày
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="section-head">
          <h2 className="section-title">Đơn hàng gần đây</h2>
          <div className="section-link">Xem tất cả</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Xe</th>
                <th>Khách hàng</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.carName}</td>
                  <td>{order.user}</td>
                  <td>{order.time}</td>
                  <td>
                    <span
                      className={`status-pill ${getStatusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
