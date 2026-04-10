import React, { useState } from "react";

function ContractManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dữ liệu mẫu hợp đồng
  const contracts = [
    {
      id: "HD-2026-001",
      customer: "Nguyễn Văn A",
      car: "VinFast Lux A2.0",
      licensePlate: "30H-123.45",
      dateCreated: "05/04/2026",
      status: "Signed", // Signed | Pending | Expired
      totalValue: 5400000,
    },
    {
      id: "HD-2026-002",
      customer: "Trần Thị B",
      car: "Toyota Camry",
      licensePlate: "29A-888.88",
      dateCreated: "08/04/2026",
      status: "Pending",
      totalValue: 3200000,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Signed":
        return { bg: "#dcfce7", color: "#16a34a", text: "Đã ký kết" };
      case "Pending":
        return { bg: "#fef9c3", color: "#a16207", text: "Chờ chữ ký" };
      case "Expired":
        return { bg: "#fee2e2", color: "#dc2626", text: "Hết hạn" };
      default:
        return { bg: "#f1f5f9", color: "#64748b", text: "Không xác định" };
    }
  };

  return (
    <div className="contract-container">
      <style>{`
        .contract-container { font-family: 'Inter', sans-serif; padding: 20px; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-flex h1 { font-size: 1.8rem; font-weight: 900; color: #0f172a; margin: 0; }

        /* Search Bar */
        .search-box {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 10px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          width: 300px;
        }
        .search-box input { border: none; outline: none; width: 100%; font-weight: 500; }

        /* Table Styling */
        .contract-table-wrapper {
          background: white;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { background: #f8fafc; padding: 16px 20px; font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
        td { padding: 18px 20px; border-top: 1px solid #f1f5f9; font-size: 0.95rem; color: #1e293b; font-weight: 500; }
        
        .id-badge { font-family: 'Mono', monospace; font-weight: 700; color: #2563eb; }
        .car-info { font-weight: 700; display: block; }
        .plate-info { font-size: 0.8rem; color: #94a3b8; }

        .status-pill {
          padding: 6px 12px;
          border-radius: 99px;
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-block;
        }

        .action-btns { display: flex; gap: 10px; }
        .btn-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }
        .btn-icon:hover { background: #f1f5f9; border-color: #cbd5e1; }
        
        .btn-view { color: #2563eb; }
        .btn-download { color: #16a34a; }
        .btn-print { color: #64748b; }
      `}</style>

      <div className="header-flex">
        <h1>Quản lý hợp đồng</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm mã hợp đồng, khách hàng..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="contract-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Mã hợp đồng</th>
              <th>Khách hàng</th>
              <th>Thông tin xe</th>
              <th>Ngày tạo</th>
              <th>Giá trị</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((item) => {
              const statusStyle = getStatusStyle(item.status);
              return (
                <tr key={item.id}>
                  <td>
                    <span className="id-badge">{item.id}</span>
                  </td>
                  <td>{item.customer}</td>
                  <td>
                    <span className="car-info">{item.car}</span>
                    <span className="plate-info">{item.licensePlate}</span>
                  </td>
                  <td>{item.dateCreated}</td>
                  <td style={{ fontWeight: 700 }}>
                    {item.totalValue.toLocaleString()}đ
                  </td>
                  <td>
                    <span
                      className="status-pill"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {statusStyle.text}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn-icon btn-view"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-icon btn-download"
                        title="Tải file PDF"
                      >
                        📥
                      </button>
                      <button
                        className="btn-icon btn-print"
                        title="In hợp đồng"
                      >
                        🖨️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContractManagement;
