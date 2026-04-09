import { useState } from "react";

function CarsManager() {
  // Dữ liệu mẫu (Sau này bạn sẽ gọi API từ Laravel backend)
  const [cars, setCars] = useState([
    {
      id: 1,
      brand: "Toyota",
      model: "Vios",
      year: 2023,
      plate: "30H-123.45",
      price: 800000,
      status: "Sẵn sàng",
    },
    {
      id: 2,
      brand: "KIA",
      model: "Sonet",
      year: 2024,
      plate: "30K-999.99",
      price: 900000,
      status: "Đang thuê",
    },
    {
      id: 3,
      brand: "Hyundai",
      model: "Accent",
      year: 2022,
      plate: "30E-567.89",
      price: 750000,
      status: "Bảo trì",
    },
    {
      id: 4,
      brand: "Ford",
      model: "Everest",
      year: 2024,
      plate: "30L-444.22",
      price: 1500000,
      status: "Sẵn sàng",
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Sẵn sàng":
        return "status-ready";
      case "Đang thuê":
        return "status-rented";
      case "Bảo trì":
        return "status-repair";
      default:
        return "";
    }
  };

  return (
    <div className="manager-container">
      <style>{`
        .manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .manager-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; }
        
        .action-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          background: #fff;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
        }

        .search-input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          outline: none;
        }

        .btn-add {
          background: #16a34a;
          color: #fff;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }

        .table-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .cars-table { width: 100%; border-collapse: collapse; }
        .cars-table th { background: #f8fafc; padding: 16px; text-align: left; color: #64748b; font-size: 0.9rem; }
        .cars-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #1e293b; }

        .status-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .status-ready { background: #dcfce7; color: #166534; }
        .status-rented { background: #dbeafe; color: #1d4ed8; }
        .status-repair { background: #fee2e2; color: #991b1b; }

        .btn-edit { color: #2563eb; margin-right: 12px; cursor: pointer; border: none; background: none; font-weight: 700; }
        .btn-delete { color: #dc2626; cursor: pointer; border: none; background: none; font-weight: 700; }
      `}</style>

      <div className="manager-header">
        <h1 className="manager-title">Quản lý danh sách xe</h1>
        <button className="btn-add">+ Thêm xe mới</button>
      </div>

      <div className="action-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm theo tên xe, biển số..."
        />
        <select className="search-input" style={{ flex: "0 0 200px" }}>
          <option value="">Tất cả hãng</option>
          <option value="toyota">Toyota</option>
          <option value="kia">KIA</option>
        </select>
      </div>

      <div className="table-card">
        <table className="cars-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Thông tin xe</th>
              <th>Biển số</th>
              <th>Giá thuê/Ngày</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>#{car.id}</td>
                <td>
                  <div style={{ fontWeight: 800 }}>
                    {car.brand} {car.model}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Đời {car.year}
                  </div>
                </td>
                <td>{car.plate}</td>
                <td>{car.price.toLocaleString("vi-VN")} đ</td>
                <td>
                  <span
                    className={`status-badge ${getStatusStyle(car.status)}`}
                  >
                    {car.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit">Sửa</button>
                  <button className="btn-delete">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarsManager;
