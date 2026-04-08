import { useEffect, useState } from "react";
import CustomerHeader from "../components/CustomerHeader.jsx";
import Footer from "../components/Footer.jsx";

function HomeCustomer() {
  const banners = [
    "/images/banner-1.jpg",
    "/images/banner-2.jpg",
    "/images/banner-3.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState("TP. Hồ Chí Minh");
  const [rentalTime, setRentalTime] = useState(
    "21:00, 08/04/2026 - 20:00, 09/04/2026"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleSearch = () => {
    console.log("Search:", { location, rentalTime });
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background-color: #f8f9fa;
          color: #1f2937;
        }

        .home-page {
          min-height: 100vh;
          background: #ffffff;
        }

        .hero-section {
          padding: 26px 0 110px;
        }

        .hero-wrapper {
          position: relative;
          border-radius: 28px;
          overflow: visible;
        }

        .hero-banner {
          height: 650px;
          border-radius: 28px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
          transition: background-image 0.6s ease-in-out;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.18),
            rgba(0, 0, 0, 0.35)
          );
        }

        .hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          padding: 20px;
          z-index: 2;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.2;
          max-width: 900px;
          margin-bottom: 18px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
        }

        .hero-divider {
          width: 280px;
          height: 2px;
          background: rgba(255, 255, 255, 0.8);
          margin: 10px auto 24px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 500;
          max-width: 900px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle .highlight {
          color: #4ade80;
          font-weight: 800;
        }

        .slider-dots {
          margin-top: 28px;
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
        }

        .slider-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.45);
          transition: all 0.2s ease;
        }

        .slider-dot.active {
          width: 30px;
          border-radius: 999px;
          background: #ffffff;
        }

        .search-panel {
          position: absolute;
          left: 50%;
          bottom: -58px;
          transform: translateX(-50%);
          width: min(1100px, calc(100% - 40px));
          z-index: 20;
        }

        .search-tabs {
          width: fit-content;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 18px 18px 0 0;
          overflow: hidden;
          box-shadow: 0 -2px 18px rgba(0, 0, 0, 0.06);
          display: flex;
        }

        .search-tab {
          padding: 18px 34px;
          font-weight: 700;
          border: none;
          background: #fff;
          color: #9ca3af;
          transition: 0.2s ease;
        }

        .search-tab.active {
          background: #5bd48a;
          color: #fff;
        }

        .search-card {
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 18px 40px rgba(17, 24, 39, 0.14);
          padding: 24px 26px;
        }

        .search-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.4fr auto;
          gap: 0;
          align-items: center;
        }

        .search-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 8px 18px;
        }

        .search-item + .search-item {
          border-left: 1px solid #e5e7eb;
        }

        .search-icon {
          font-size: 1.35rem;
          line-height: 1;
          margin-top: 4px;
        }

        .search-label {
          color: #6b7280;
          font-size: 0.98rem;
          margin-bottom: 6px;
        }

        .search-select,
        .search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 1.15rem;
          font-weight: 700;
          color: #111827;
          background: transparent;
          padding: 0;
        }

        .search-btn {
          min-width: 126px;
          height: 68px;
          border: none;
          border-radius: 16px;
          background: #5bd48a;
          color: white;
          font-size: 1.35rem;
          font-weight: 800;
          padding: 0 28px;
          transition: 0.2s ease;
        }

        .search-btn:hover {
          background: #45c574;
        }

        @media (max-width: 1199.98px) {
          .hero-title {
            font-size: 3.2rem;
            max-width: 760px;
          }
        }

        @media (max-width: 991.98px) {
          .hero-banner {
            height: 560px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.05rem;
          }

          .search-panel {
            position: static;
            transform: none;
            width: 100%;
            margin-top: 18px;
          }

          .search-tabs {
            margin-left: 0;
            margin-right: 0;
            flex-wrap: wrap;
          }

          .search-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .search-item + .search-item {
            border-left: none;
            border-top: 1px solid #e5e7eb;
            padding-top: 18px;
          }

          .search-btn {
            width: 100%;
            height: 56px;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 575.98px) {
          .hero-section {
            padding: 16px 0 30px;
          }

          .hero-banner {
            height: 470px;
            border-radius: 20px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-divider {
            width: 180px;
          }

          .hero-subtitle {
            font-size: 0.95rem;
          }

          .search-card {
            padding: 18px 16px;
            border-radius: 18px;
          }

          .search-tab {
            padding: 14px 18px;
            font-size: 0.92rem;
          }
        }
      `}</style>

      <div className="home-page">
        <CustomerHeader />

        <section className="hero-section">
          <div className="container">
            <div className="hero-wrapper">
              <div
                className="hero-banner"
                style={{ backgroundImage: `url(${banners[currentSlide]})` }}
              >
                <div className="hero-overlay"></div>

                <div className="hero-content">
                  <h1 className="hero-title">
                    CarRent - Cùng Bạn Trên
                    <br />
                    Mọi Hành Trình
                  </h1>

                  <div className="hero-divider"></div>

                  <p className="hero-subtitle">
                    Trải nghiệm sự khác biệt từ{" "}
                    <span className="highlight">hơn 10.000</span> xe tự lái đổi
                    mới khắp Việt Nam
                  </p>

                  <div className="slider-dots">
                    {banners.map((_, index) => (
                      <button
                        key={index}
                        className={`slider-dot ${
                          currentSlide === index ? "active" : ""
                        }`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="search-panel">
                <div className="search-tabs">
                  <button className="search-tab active">Xe tự lái</button>
                  <button className="search-tab">Xe có tài xế</button>
                  <button className="search-tab">Thuê xe dài hạn</button>
                </div>

                <div className="search-card">
                  <div className="search-grid">
                    <div className="search-item">
                      <div className="search-icon">📍</div>
                      <div className="w-100">
                        <div className="search-label">Địa điểm</div>
                        <select
                          className="search-select"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        >
                          <option>TP. Hồ Chí Minh</option>
                          <option>Hà Nội</option>
                          <option>Đà Nẵng</option>
                          <option>Cần Thơ</option>
                        </select>
                      </div>
                    </div>

                    <div className="search-item">
                      <div className="search-icon">📅</div>
                      <div className="w-100">
                        <div className="search-label">Thời gian thuê</div>
                        <input
                          type="text"
                          className="search-input"
                          value={rentalTime}
                          onChange={(e) => setRentalTime(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="ps-lg-4 pt-3 pt-lg-0">
                      <button className="search-btn" onClick={handleSearch}>
                        Tìm Xe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default HomeCustomer;