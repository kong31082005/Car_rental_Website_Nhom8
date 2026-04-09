import { useState } from "react";

function UsersManager() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Vu Truong Giang",
      email: "giang@example.com",
      role: "Admin",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Nguyen Van A",
      email: "vana@example.com",
      role: "Customer",
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Tran Thi B",
      email: "thib@example.com",
      role: "Customer",
      status: "Bị khóa",
    },
  ]);

  const getStatusStyle = (status) => {
    return status === "Hoạt động" ? "status-active" : "status-locked";
  };

  return (
    <div className="manager-container">
      <style>{`
        .manager-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .manager-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; }
        .btn-add { background: #4f46e5; color: #fff; padding: 10px 20px; border-radius: 10px; font-weight: 700; border: none; cursor: pointer; }
        
        .table-card { background: #fff; border-radius: 20px; border: 1px solid #e5e7eb; overflow: hidden; }
        .users-table { width: 100%; border-collapse: collapse; }
        .users-table th { background: #f8fafc; padding: 16px; text-align: left; color: #64748b; font-size: 0.9rem; }
        .users-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; font-weight: 600; }

        .status-badge { padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; }
        .status-active { background: #dcfce7; color: #166534; }
        .status-locked { background: #fee2e2; color: #991b1b; }
        
        .role-badge { padding: 4px 8px; background: #f1f5f9; border-radius: 6px; font-size: 0.85rem; color: #475569; }
        .btn-edit { color: #2563eb; margin-right: 12px; cursor: pointer; border: none; background: none; font-weight: 700; }
      `}</style>

      <div className="manager-header">
        <h1 className="manager-title">Quản lý người dùng</h1>
      </div>

      <div className="table-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Người dùng</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>
                  <div style={{ fontWeight: 800 }}>{user.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    {user.email}
                  </div>
                </td>
                <td>
                  <span className="role-badge">{user.role}</span>
                </td>
                <td>
                  <span
                    className={`status-badge ${getStatusStyle(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit">Sửa</button>
                  <button
                    style={{
                      color: "#dc2626",
                      border: "none",
                      background: "none",
                      fontWeight: 700,
                    }}
                  >
                    Khóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersManager;
