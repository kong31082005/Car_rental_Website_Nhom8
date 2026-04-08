import avatarImage from "../assets/avatar.png";
import logoImage from "../assets/logo.png";

function CustomerHeader() {
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

        .brand-logo {
          height: 42px;
          object-fit: contain;
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

        .icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .icon-btn:hover {
          background: #f3f4f6;
        }

        .avatar-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: 12px;
          border-left: 1px solid #e5e7eb;
        }

        .avatar-img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }

        @media (max-width: 991.98px) {
          .top-navbar {
            height: auto;
            padding: 12px 0;
          }

          .page-container {
            width: calc(100% - 28px);
          }
        }
      `}</style>

      <header className="top-navbar d-flex align-items-center">
        <div className="page-container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center">
              <img src={logoImage} alt="logo" className="brand-logo" />
            </div>

            <div className="d-flex align-items-center flex-wrap">
              <a href="#" className="nav-link-custom">
                Về chúng tôi
              </a>
              <a href="#" className="nav-link-custom">
                Trở thành chủ xe
              </a>
              <a href="#" className="nav-link-custom">
                Chuyến của tôi
              </a>

              <div className="d-flex align-items-center gap-2 ms-lg-3">
                <button className="icon-btn">🔔</button>
                <button className="icon-btn">💬</button>

                <div className="avatar-box">
                  <img
                    src={avatarImage}
                    alt="avatar"
                    className="avatar-img"
                  />
                  <span className="fw-semibold">Nguyễn Văn Công</span>
                  <span>▾</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default CustomerHeader;