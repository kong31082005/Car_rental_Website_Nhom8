import React, { useState } from "react";

function VoucherManagement() {
  const [showAddModal, setShowAddModal] = useState(false);

  // Dữ liệu mẫu Voucher
  const vouchers = [
    {
      id: 1,
      code: "SUMMER2026",
      discountType: "Percentage", // Percentage | Fixed
      value: 20,
      minOrder: 1000000,
      maxDiscount: 500000,
      startDate: "2026-04-01",
      endDate: "2026-05-01",
      usageLimit: 100,
      usedCount: 45,
      status: "Active",
    },
    {
      id: 2,
      code: "WELCOMECAR",
      discountType: "Fixed",
      value: 200000,
      minOrder: 500000,
      maxDiscount: 200000,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      usageLimit: 500,
      usedCount: 120,
      status: "Active",
    },
    {
      id: 3,
      code: "OFF30",
      discountType: "Percentage",
      value: 30,
      minOrder: 2000000,
      maxDiscount: 1000000,
      startDate: "2026-02-01",
      endDate: "2026-03-01",
      usageLimit: 50,
      usedCount: 50,
      status: "Expired",
    }
  ];

  return (
    <div className="voucher-container">
      <style>{`
        .voucher-container { font-family: 'Inter', sans-serif; padding: 20px; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-flex h1 { font-size: 1.8rem; font-weight: 900; color: #0f172a; margin: 0; }

        .btn-add-voucher {
          background: #16a34a; color: white; border: none; padding: 12px 24px;
          border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .btn-add-voucher:hover { background: #15803d; transform: translateY(-2px); }

        /* Grid hiển thị Voucher */
        .voucher-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }

        .voucher-card {
          background: white; border-radius: 20px; border: 1px solid #e2e8f0;
          display: flex; overflow: hidden; position: relative; transition: 0.3s;
        }
        .voucher-card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.05); }

        /* Phần bên trái Card (Màu sắc theo loại) */
        .voucher-left {
          width: 100px; background: #f1f5f9; display: flex; flex-direction: column;
          align-items: center; justify-content: center; padding: 10px; border-right: 2px dashed #e2e8f0;
        }
        .voucher-card.Active .voucher-left { background: #dcfce7; color: #16a34a; }
        .voucher-card.Expired .voucher-left { background: #f1f5f9; color: #94a3b8; }

        .discount-val { font-size: 1.5rem; font-weight: 900; }
        .discount-unit { font-size: 0.8rem; font-weight: 700; }

        /* Phần bên phải Card */
        .voucher-right { flex: 1; padding: 16px; position: relative; }
        .voucher-code { 
          display: inline-block; background: #f8fafc; border: 1px dashed #cbd5e1;
          padding: 4px 12px; border-radius: 6px; font-family: monospace;
          font-weight: 700; color: #334155; margin-bottom: 10px;
        }
        .voucher-title { font-weight: 800; font-size: 1rem; color: #1e293b; margin-bottom: 4px; }
        .voucher-desc { font-size: 0.8rem; color: #64748b; line-height: 1.4; margin-bottom: 12px; }

        /* Progress Bar cho lượt dùng */
        .usage-container { margin-top: 10px; }
        .usage-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px; }
        .usage-bar { width: 100%; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
        .usage-fill { height: 100%; background: #16a34a; border-radius: 3px; }

        .status-badge {
          position: absolute; top: 12px; right: 12px; font-size: 0.7rem;
          font-weight: 800; padding: 2px 8px; border-radius: 6px; text-transform: uppercase;
        }
        .Active .status-badge { background: #dcfce7; color: #16a34a; }
        .Expired .status-badge { background: #fee2e2; color: #dc2626; }

        /* Dot cutouts (Giả hiệu ứng xé vé) */
        .cutout { 
          position: absolute; width: 20px; height: 20px; background: #f1f5f9; 
          border-radius: 50%; left: 90px; z-index: 1;
        }
        .cutout-top { top: -10px; }
        .cutout-bottom { bottom: -10px; }
      `}</style>

      <div className="header-flex">
        <h1>Quản lý Voucher</h1>
        <button className="btn-add-voucher" onClick={() => setShowAddModal(true)}>
          <span>➕</span> Tạo mã mới
        </button>
      </div>

      <div className="voucher-grid">
        {vouchers.map((v) => (
          <div key={v.id} className={`voucher-card ${v.status}`}>
            <div className="cutout cutout-top"></div>
            <div className="cutout cutout-bottom"></div>
            
            <div className="voucher-left">
              <span className="discount-val">{v.value}</span>
              <span className="discount-unit">{v.discountType === "Percentage" ? "%" : "VNĐ"}</span>
            </div>

            <div className="voucher-right">
              <span className="status-badge">{v.status === "Active" ? "Đang chạy" : "Hết hạn"}</span>
              <div className="voucher-code">{v.code}</div>
              <div className="voucher-title">
                Giảm {v.value.toLocaleString()}{v.discountType === "Percentage" ? "%" : "đ"}
              </div>
              <div className="voucher-desc">
                Đơn tối thiểu: {v.minOrder.toLocaleString()}đ<br/>
                Hạn dùng: {v.startDate} đến {v.endDate}
              </div>

              <div className="usage-container">
                <div className="usage-label">
                  <span>Đã dùng: {v.usedCount}/{v.usageLimit}</span>
                  <span>{Math.round((v.usedCount / v.usageLimit) * 100)}%</span>
                </div>
                <div className="usage-bar">
                  <div 
                    className="usage-fill" 
                    style={{ 
                      width: `${(v.usedCount / v.usageLimit) * 100}%`,
                      backgroundColor: v.status === "Expired" ? "#cbd5e1" : "#16a34a"
                    }}
                  ></div>
                </div>
              </div>

              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button style={{ border: 'none', background: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>Sửa</button>
                <button style={{ border: 'none', background: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>Xóa</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoucherManagement;