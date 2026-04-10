import React, { useState, useEffect } from "react";
// Giả định bạn đã có service lấy danh sách đơn thuê
// import { getBookings, updateBookingStatus } from "../../services/bookingService";

function BookingManagement() {
  const [activeTab, setActiveTab] = useState("Pending"); // Mặc định là đơn đang chờ
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Danh sách các trạng thái
  const tabs = [
    { id: "Pending", label: "Đang chờ", icon: "⏳", color: "#2563eb" },
    { id: "Approved", label: "Đã duyệt", icon: "✅", color: "#16a34a" },
    { id: "InUse", label: "Đang dùng", icon: "🚗", color: "#8b5cf6" },
    { id: "Completed", label: "Hoàn thành", icon: "🏁", color: "#64748b" },
    { id: "Rejected", label: "Từ chối", icon: "❌", color: "#dc2626" },
  ];

  // Logic lấy dữ liệu (Giả lập)
  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    // Gọi API thực tế tại đây
    // const data = await getBookings(activeTab);
    // setBookings(data);
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    // Logic cập nhật trạng thái đơn hàng (Duyệt/Từ chối/Hoàn thành)
    console.log(`Cập nhật đơn ${id} sang ${newStatus}`);
    // await updateBookingStatus(id, newStatus);
    fetchBookings();
  };

  return (
    <div className="booking-manage-container">
      <style>{`
        .booking-manage-container { font-family: 'Inter', sans-serif; padding: 20px; }
        .page-header { margin-bottom: 24px; }
        .page-header h1 { font-size: 1.8rem; font-weight: 900; color: #0f172a; }

        /* Tabs Styling */
        .tabs-wrapper { 
          display: flex; 
          gap: 12px; 
          background: #f1f5f9; 
          padding: 6px; 
          border-radius: 16px; 
          margin-bottom: 24px;
          overflow-x: auto;
        }
        .tab-item {
          padding: 12px 20px;
          border-radius: 12px;
          cursor: pointer;
          border: none;
          background: transparent;
          font-weight: 700;
          color: #64748b;
          white-space: nowrap;
          transition: 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tab-item.active {
          background: white;
          color: #0f172a;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        /* Booking Card/Table */
        .booking-list { display: flex; flex-direction: column; gap: 16px; }
        .booking-card {
          background: white;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          padding: 20px;
          display: grid;
          grid-template-columns: 120px 1fr auto;
          gap: 20px;
          align-items: center;
          transition: 0.3s;
        }
        .booking-card:hover { border-color: #16a34a; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }

        .car-thumb {
          width: 120px;
          height: 80px;
          border-radius: 12px;
          object-fit: cover;
          background: #f8fafc;
        }

        .booking-info h3 { margin: 0 0 4px 0; font-size: 1.1rem; color: #1e293b; }
        .booking-meta { display: flex; gap: 16px; font-size: 0.85rem; color: #64748b; }
        .user-info { margin-top: 8px; font-size: 0.9rem; font-weight: 600; color: #334155; }

        .price-tag { text-align: right; }
        .total-amount { display: block; font-size: 1.2rem; font-weight: 800; color: #16a34a; }
        .payment-status { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

        /* Actions */
        .actions-group { display: flex; gap: 8px; margin-top: 10px; }
        .btn-action {
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          border: none;
          transition: 0.2s;
        }
        .btn-approve { background: #dcfce7; color: #15803d; }
        .btn-reject { background: #fee2e2; color: #b91c1c; }
        .btn-detail { background: #f1f5f9; color: #475569; }
        .btn-action:hover { transform: translateY(-2px); filter: brightness(0.95); }

        .empty-state { text-align: center; padding: 60px; color: #94a3b8; }
      `}</style>

      <div className="page-header">
        <h1>Quản lý đơn thuê</h1>
      </div>

      {/* Bộ chọn trạng thái */}
      <div className="tabs-wrapper">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Danh sách đơn hàng */}
      <div className="booking-list">
        {loading ? (
          <div className="empty-state">Đang tải dữ liệu...</div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>📑</div>
            <p>Không có đơn thuê nào trong mục này</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <img 
                src={booking.carImage || "https://via.placeholder.com/120x80"} 
                alt="car" 
                className="car-thumb" 
              />
              
              <div className="booking-info">
                <h3>{booking.carName || "VinFast Lux A2.0"}</h3>
                <div className="booking-meta">
                  <span>📅 {booking.startDate} - {booking.endDate}</span>
                  <span>📍 {booking.location || "Hà Nội"}</span>
                </div>
                <div className="user-info">
                  Khách hàng: {booking.userName || "Nguyễn Văn A"} • {booking.userPhone || "0987xxx"}
                </div>
                
                {/* Các nút xử lý nhanh dựa trên Tab hiện tại */}
                <div className="actions-group">
                  {activeTab === "Pending" && (
                    <>
                      <button className="btn-action btn-approve" onClick={() => handleStatusChange(booking.id, "Approved")}>Chấp nhận</button>
                      <button className="btn-action btn-reject" onClick={() => handleStatusChange(booking.id, "Rejected")}>Từ chối</button>
                    </>
                  )}
                  {activeTab === "Approved" && (
                    <button className="btn-action btn-approve" onClick={() => handleStatusChange(booking.id, "InUse")}>Bàn giao xe</button>
                  )}
                  {activeTab === "InUse" && (
                    <button className="btn-action btn-approve" onClick={() => handleStatusChange(booking.id, "Completed")}>Xác nhận trả xe</button>
                  )}
                  <button className="btn-action btn-detail">Chi tiết</button>
                </div>
              </div>

              <div className="price-tag">
                <span className="total-amount">{(booking.totalPrice || 1200000).toLocaleString()}đ</span>
                <span className="payment-status">
                  {booking.isPaid ? "✅ Đã thanh toán" : "💰 Thanh toán khi nhận xe"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingManagement;