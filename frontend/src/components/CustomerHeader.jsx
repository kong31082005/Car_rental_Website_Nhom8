import avatarImage from "../assets/avatar.png";
import logoImage from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationBell from "./NotificationBell";

function CustomerHeader() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("auth-changed", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("auth-changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const requireLogin = (callback) => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để sử dụng chức năng này.");
      navigate("/login");
      return;
    }

    callback?.();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-changed"));
    setShowDropdown(false);
    navigate("/home");
  };

  return (
    <>
      <style>{`
        .page-container {
          width: min(1400px, calc(100% - 120px));
          margin: 0 auto;
        }

        .top-navbar {
          height: 78px;
          background: #ffffff;
          border-bottom: 1px solid #ececec;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand-logo {
          height: 58px;
          object-fit: contain;
        }

        .brand-text {
          font-size: 1.55rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: 0.2px;
          text-decoration: none;
          line-height: 1;
        }

        .brand-k {
          color: #16a34a;
          font-weight: 900;
        }

        .nav-link-custom {
          font-weight: 600;
          color: #1f2937;
          text-decoration: none;
          margin: 0 18px;
          white-space: nowrap;
          transition: 0.2s ease;
        }

        .nav-link-custom:hover {
          color: #16a34a;
        }

        .header-right {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .icon-btn:hover {
          background: #f3f4f6;
        }

        .icon-btn svg {
          color: #4b5563;
          transition: 0.2s ease;
        }

        .icon-btn:hover svg {
          color: #16a34a;
        }

        .heart-icon svg {
          color: #ec4899;
          fill: transparent;
        }

        .heart-icon:hover svg {
          color: #db2777;
          fill: #fce7f3;
        }

        .icon-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 18px;
        }

        .avatar-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: 14px;
          margin-left: 14px;
          border-left: 1px solid #e5e7eb;
        }

        .avatar-img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }

        .auth-links {
          display: flex;
          align-items: center;
          margin-left: 18px;
          padding-left: 18px;
          border-left: 1px solid #e5e7eb;
          gap: 12px;
        }

        .register-link,
        .login-link {
          text-decoration: none;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: 10px;
          transition: 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .register-link {
          color: #111827;
          background: transparent;
        }

        .register-link:hover {
          color: #16a34a;
        }

        .login-link {
          color: #111827;
          border: 1px solid #111827;
          background: #ffffff;
        }

        .login-link:hover {
          background: #f9fafb;
        }

        .avatar-box-wrapper {
          position: relative;
        }

        .avatar-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: 14px;
          margin-left: 14px;
          border-left: 1px solid #e5e7eb;
          cursor: pointer;
        }

        .avatar-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
          z-index: 999;
          min-width: 160px;
        }

        .avatar-dropdown button {
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: #fff;
          text-align: left;
          cursor: pointer;
          font-weight: 600;
        }

        .avatar-dropdown button:hover {
          background: #f9fafb;
          color: #ef4444;
        }

        @media (max-width: 991.98px) {
          .top-navbar {
            height: auto;
            padding: 12px 0;
          }

          .page-container {
            width: calc(100% - 28px);
          }

          .brand-text {
            font-size: 1.3rem;
          }

          .header-right {
            gap: 10px;
          }

          .auth-links {
            margin-left: 0;
            padding-left: 0;
            border-left: none;
          }

          .avatar-box {
            margin-left: 0;
            padding-left: 0;
            border-left: none;
          }
        }
      `}</style>

      <header className="top-navbar d-flex align-items-center">
        <div className="page-container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <Link to="/home" className="brand-wrap">
              <img src={logoImage} alt="logo" className="brand-logo" />
              <span className="brand-text">
                <span className="brand-k">K</span>ongcars
              </span>
            </Link>

            <div className="header-right">
              <a href="#" className="nav-link-custom">
                Về Kongcars
              </a>

              <a href="/community" className="nav-link-custom">
                Tin tức
              </a>

              {!isLoggedIn ? (
                <div className="auth-links">
                  <Link to="/register" className="register-link">
                    Đăng ký
                  </Link>
                  <Link to="/login" className="login-link">
                    Đăng nhập
                  </Link>
                </div>
              ) : (
                <>
                  <a href="#" className="nav-link-custom">
                    Chuyến của tôi
                  </a>

                  <a href="/rewards" className="nav-link-custom">
                    Quà tặng
                  </a>

                  <div className="icon-group">
                    <NotificationBell />

                    <button
                      className="icon-btn heart-icon"
                      title="Yêu thích"
                      onClick={() => requireLogin(() => navigate("/favorites"))}
                      type="button"
                    >
                      <Heart size={18} />
                    </button>

                    <button
                      className="icon-btn"
                      title="Tin nhắn"
                      onClick={() => requireLogin()}
                      type="button"
                    >
                      <MessageCircle size={18} />
                    </button>
                  </div>

                  <div className="avatar-box-wrapper">
                    <div
                      className="avatar-box"
                      onClick={() => setShowDropdown((prev) => !prev)}
                    >
                      <img src={avatarImage} alt="avatar" className="avatar-img" />
                      <span className="fw-semibold">Nguyễn Văn Công</span>
                      <span>▾</span>
                    </div>

                    {showDropdown && (
                      <div className="avatar-dropdown">
                        <button onClick={handleLogout}>Đăng xuất</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default CustomerHeader;