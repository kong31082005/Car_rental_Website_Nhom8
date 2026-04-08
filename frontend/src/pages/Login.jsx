import { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/login-bg.jpg";
import sideImage from "../assets/login-bg.jpg";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu tối thiểu 8 ký tự";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setErrors({
        general: "UI đã sẵn sàng. Bước tiếp theo là nối API đăng nhập.",
      });
      console.log("Login form:", formData);
    }, 1000);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .login-page {
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .login-overlay {
          min-height: 100vh;
          background: rgba(10, 14, 30, 0.45);
        }

        .login-card {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          min-height: 620px;
          background: rgba(255, 255, 255, 0.94);
          border-radius: 28px;
          overflow: hidden;
          backdrop-filter: blur(6px);
        }

        .login-left {
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .login-left-overlay {
          height: 100%;
          padding: 40px 34px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(
            180deg,
            rgba(62, 66, 170, 0.84) 0%,
            rgba(102, 53, 194, 0.82) 100%
          );
        }

        .brand {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 32px;
        }

        .login-left h1 {
          font-size: 2.3rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 18px;
        }

        .login-left p {
          font-size: 1rem;
          line-height: 1.8;
          max-width: 470px;
          margin: 0;
          color: rgba(255, 255, 255, 0.95);
        }

        .left-footer {
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.88);
        }

        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at top right, rgba(102, 53, 194, 0.08), transparent 35%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(250, 250, 253, 0.94));
        }

        .login-form-wrapper {
          width: 100%;
          max-width: 430px;
          padding: 40px 34px;
        }

        .login-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1c2440;
          margin-bottom: 8px;
        }

        .login-subtitle {
          color: #6b7280;
          margin-bottom: 28px;
        }

        .custom-input {
          height: 50px;
          border-radius: 14px;
          border: 1px solid #d7def0;
          background-color: #f6f8ff;
          padding: 0 16px;
          font-size: 0.96rem;
        }

        .custom-input:focus {
          border-color: #6c63ff;
          box-shadow: 0 0 0 0.2rem rgba(108, 99, 255, 0.15);
          background-color: #ffffff;
        }

        .login-btn {
          height: 50px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          color: #ffffff;
          font-weight: 700;
          transition: all 0.25s ease;
        }

        .login-btn:hover {
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(76, 61, 214, 0.28);
        }

        .forgot-link {
          color: #5b4cf0;
          cursor: pointer;
          font-weight: 600;
        }

        .register-text {
          margin-top: 22px;
          text-align: center;
          color: #6b7280;
          font-size: 0.95rem;
        }

        .register-text span {
          color: #5b4cf0;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 991.98px) {
          .login-card {
            grid-template-columns: 1fr;
          }

          .login-left {
            min-height: 280px;
          }

          .login-left h1 {
            font-size: 1.9rem;
          }
        }

        @media (max-width: 575.98px) {
          .login-form-wrapper {
            padding: 30px 20px;
          }

          .login-left-overlay {
            padding: 28px 22px;
          }

          .login-title {
            font-size: 1.7rem;
          }

          .brand {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <div
        className="login-page"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="login-overlay">
          <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100 py-4">
              <div className="col-12 col-xl-9">
                <div className="login-card shadow-lg">
                  <div
                    className="login-left"
                    style={{ backgroundImage: `url(${sideImage})` }}
                  >
                    <div className="login-left-overlay">
                      <div>
                        <div className="brand">KongCars</div>
                        <h1>Chào mừng bạn quay lại</h1>
                        <p>
                          Đăng nhập để truy cập hệ thống thuê xe tự lái, quản lý
                          tài khoản và tiếp tục trải nghiệm dịch vụ nhanh chóng,
                          an toàn và tiện lợi.
                        </p>
                      </div>

                      <div className="left-footer">
                        Hệ thống thuê xe tự lái dành cho Customer, Owner và
                        Admin
                      </div>
                    </div>
                  </div>

                  <div className="login-right">
                    <div className="login-form-wrapper">
                      <h2 className="login-title">Đăng nhập</h2>
                      <p className="login-subtitle">
                        Nhập thông tin tài khoản để truy cập vào hệ thống.
                      </p>

                      {errors.general && (
                        <div className="alert alert-warning py-2" role="alert">
                          {errors.general}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className={`form-control custom-input ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Nhập email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Mật khẩu
                          </label>
                          <input
                            type="password"
                            name="password"
                            className={`form-control custom-input ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4 small">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="rememberMe"
                              name="remember"
                              checked={formData.remember}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rememberMe"
                            >
                              Ghi nhớ đăng nhập
                            </label>
                          </div>

                          <span className="forgot-link">Quên mật khẩu?</span>
                        </div>

                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn login-btn"
                            disabled={loading}
                          >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                          </button>
                        </div>
                      </form>

                      <div className="register-text">
                        Chưa có tài khoản?{" "}
                        <Link to="/register">
                          <span>Đăng ký ngay</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
