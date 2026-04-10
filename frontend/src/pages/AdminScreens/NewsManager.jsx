import React, { useState } from "react";

function NewsManagement() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Dữ liệu mẫu bài đăng
  const posts = [
    {
      id: 1,
      title: "Kinh nghiệm thuê xe tự lái dịp lễ 30/4 và 1/5",
      author: "Admin - Giang Vu",
      category: "Kinh nghiệm",
      date: "2026-04-10",
      thumbnail:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80",
      status: "Published", // Published | Draft
      isFeatured: true,
    },
    {
      id: 2,
      title: "Top 5 mẫu xe 7 chỗ tiết kiệm nhiên liệu nhất 2026",
      author: "Admin - Giang Vu",
      category: "Review xe",
      date: "2026-04-08",
      thumbnail:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80",
      status: "Published",
      isFeatured: false,
    },
    {
      id: 3,
      title: "Hướng dẫn kiểm tra hợp đồng thuê xe điện",
      author: "Admin - Giang Vu",
      category: "Hướng dẫn",
      date: "2026-04-05",
      thumbnail:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=300&q=80",
      status: "Draft",
      isFeatured: false,
    },
  ];

  return (
    <div className="news-container">
      <style>{`
        .news-container { font-family: 'Inter', sans-serif; padding: 20px; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-flex h1 { font-size: 1.8rem; font-weight: 900; color: #0f172a; margin: 0; }

        .btn-create-post {
          background: #2563eb; color: white; border: none; padding: 12px 24px;
          border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .btn-create-post:hover { background: #1d4ed8; transform: translateY(-2px); }

        /* Filter Tabs */
        .filter-tabs { display: flex; gap: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 24px; }
        .filter-item { 
          padding: 12px 4px; cursor: pointer; font-weight: 600; color: #64748b; 
          border-bottom: 2px solid transparent; transition: 0.2s;
        }
        .filter-item.active { color: #2563eb; border-bottom-color: #2563eb; }

        /* Post List */
        .post-list { display: flex; flex-direction: column; gap: 16px; }
        .post-item {
          background: white; border-radius: 16px; border: 1px solid #e2e8f0;
          padding: 16px; display: grid; grid-template-columns: 100px 1fr auto;
          gap: 20px; align-items: center; transition: 0.2s;
        }
        .post-item:hover { border-color: #2563eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .post-thumb { width: 100px; height: 100px; border-radius: 12px; object-fit: cover; }

        .post-info h3 { margin: 0 0 8px 0; font-size: 1.1rem; color: #1e293b; font-weight: 800; }
        .post-meta { display: flex; gap: 16px; font-size: 0.85rem; color: #64748b; align-items: center; }
        
        .badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
        .badge-category { background: #f1f5f9; color: #475569; }
        .badge-status-published { background: #dcfce7; color: #16a34a; }
        .badge-status-draft { background: #fef9c3; color: #a16207; }
        .badge-featured { background: #fee2e2; color: #dc2626; display: flex; align-items: center; gap: 4px; }

        .post-actions { display: flex; gap: 8px; }
        .btn-icon-news {
          width: 40px; height: 40px; border-radius: 10px; border: 1px solid #e2e8f0;
          background: white; cursor: pointer; display: flex; align-items: center; 
          justify-content: center; font-size: 1.1rem; transition: 0.2s;
        }
        .btn-icon-news:hover { background: #f8fafc; transform: scale(1.05); }
      `}</style>

      <div className="header-flex">
        <h1>Tin tức & Bài đăng</h1>
        <button className="btn-create-post">
          <span>✍️</span> Viết bài mới
        </button>
      </div>

      <div className="filter-tabs">
        {["All", "Published", "Draft", "Featured"].map((f) => (
          <div
            key={f}
            className={`filter-item ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f === "All"
              ? "Tất cả"
              : f === "Published"
                ? "Đã đăng"
                : f === "Draft"
                  ? "Bản nháp"
                  : "Nổi bật"}
          </div>
        ))}
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <img src={post.thumbnail} alt="thumb" className="post-thumb" />

            <div className="post-info">
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span className="badge badge-category">{post.category}</span>
                <span
                  className={`badge ${post.status === "Published" ? "badge-status-published" : "badge-status-draft"}`}
                >
                  {post.status === "Published" ? "● Công khai" : "● Bản nháp"}
                </span>
                {post.isFeatured && (
                  <span className="badge badge-featured">🔥 Nổi bật</span>
                )}
              </div>
              <h3>{post.title}</h3>
              <div className="post-meta">
                <span>👤 {post.author}</span>
                <span>📅 {post.date}</span>
                <span>👁️ 1,204 lượt xem</span>
              </div>
            </div>

            <div className="post-actions">
              <button className="btn-icon-news" title="Chỉnh sửa">
                📝
              </button>
              <button className="btn-icon-news" title="Xem trước">
                👁️
              </button>
              <button
                className="btn-icon-news"
                style={{ color: "#dc2626" }}
                title="Xóa"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsManagement;
