import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/login-bg.jpg";
import sideImage from "../assets/login-bg.jpg";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (!formData.fullName.trim())
      newErrors.fullName = "Vui lòng nhập họ và tên";

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!formData.dob) {
      newErrors.dob = "Vui lòng chọn ngày sinh";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        newErrors.dob = "Bạn phải từ 18 tuổi trở lên";
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Mật khẩu phải từ 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
      }
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    if (!formData.agreeTerms)
      newErrors.agreeTerms = "Bạn cần đồng ý với điều khoản dịch vụ";
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
      console.log("Register data:", formData);
      alert("Đăng ký thành công!");
    }, 1500);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, sans-serif; }
        .register-page { min-height: 100vh; background-size: cover; background-position: center; }
        .register-overlay { min-height: 100vh; background: rgba(10, 14, 30, 0.45); }
        .register-card { 
            display: grid; 
            grid-template-columns: 1.05fr 1fr; 
            min-height: 800px; /* Tăng chiều cao thêm một chút vì form dài hơn */
            background: rgba(255, 255, 255, 0.94); 
            border-radius: 28px; 
            overflow: hidden; 
            backdrop-filter: blur(6px); 
        }
        .register-left-overlay {
          height: 100%; padding: 40px 34px; color: #ffffff;
          display: flex; flex-direction: column; justify-content: space-between;
          background: linear-gradient(180deg, rgba(62, 66, 170, 0.84) 0%, rgba(102, 53, 194, 0.82) 100%);
        }
        .brand { font-size: 2rem; font-weight: 800; margin-bottom: 32px; }
        .register-right { 
            background: radial-gradient(circle at top right, rgba(102, 53, 194, 0.08), transparent 35%);
            display: flex; align-items: center; 
        }
        .register-form-wrapper { width: 100%; max-width: 480px; padding: 30px 40px; }
        .custom-input { 
            height: 48px; border-radius: 12px; border: 1px solid #d7def0; 
            background-color: #f6f8ff; font-size: 0.95rem; 
        }
        
        .password-input-container { position: relative; }
        .password-toggle {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #6b7280;
            display: flex;
            align-items: center;
            z-index: 10;
        }

        .register-btn { 
            height: 50px; border-radius: 14px; border: none;
            background: linear-gradient(90deg, #4f46e5, #7c3aed);
            color: white; font-weight: 700; transition: all 0.25s;
            width: 100%;
        }
        .register-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(76, 61, 214, 0.28); color: white;}
        .register-title { font-size: 1.8rem; font-weight: 800; color: #1c2440; margin-bottom: 5px; }
        .register-text span { color: #5b4cf0; font-weight: 700; cursor: pointer; }
        
        @media (max-width: 991.98px) { .register-card { grid-template-columns: 1fr; } .register-left { display: none; } }
      `}</style>

      <div
        className="register-page"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="register-overlay">
          <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100 py-5">
              <div className="col-12 col-xl-10">
                <div className="register-card shadow-lg">
                  {/* Bên trái: Thông điệp */}
                  <div
                    className="register-left"
                    style={{
                      backgroundImage: `url(${sideImage})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="register-left-overlay">
                      <div>
                        <div className="brand">KongCars</div>
                        <h1 className="fw-bold display-5">
                          Tham gia cùng chúng tôi
                        </h1>
                        <p className="mt-3 fs-5">
                          Tạo tài khoản ngay để nhận những ưu đãi đặc biệt.
                        </p>
                      </div>
                      <div className="left-footer">
                        An toàn - Nhanh chóng - Tiết kiệm
                      </div>
                    </div>
                  </div>

                  {/* Bên phải: Form */}
                  <div className="register-right">
                    <div className="register-form-wrapper">
                      <h2 className="register-title">Đăng ký tài khoản</h2>
                      <p className="text-secondary mb-4 small">
                        Khám phá hành trình mới cùng KongCars.
                      </p>

                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          {/* Họ và tên - Full Width */}
                          <div className="col-md-12 mb-3">
                            <label className="form-label small fw-bold">
                              Họ và tên
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              className={`form-control custom-input ${errors.fullName ? "is-invalid" : ""}`}
                              placeholder="Nguyễn Văn A"
                              value={formData.fullName}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              {errors.fullName}
                            </div>
                          </div>

                          {/* Email - Full Width */}
                          <div className="col-md-12 mb-3">
                            <label className="form-label small fw-bold">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              className={`form-control custom-input ${errors.email ? "is-invalid" : ""}`}
                              placeholder="example@gmail.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          </div>

                          {/* Ngày sinh - Full Width */}
                          <div className="col-md-12 mb-3">
                            <label className="form-label small fw-bold">
                              Ngày sinh
                            </label>
                            <input
                              type="date"
                              name="dob"
                              className={`form-control custom-input ${errors.dob ? "is-invalid" : ""}`}
                              value={formData.dob}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.dob}</div>
                          </div>

                          {/* MẬT KHẨU - ĐÃ ĐỔI THÀNH COL-12 ĐỂ CHIẾM 1 HÀNG */}
                          <div className="col-md-12 mb-3">
                            <label className="form-label small fw-bold">
                              Mật khẩu
                            </label>
                            <div className="password-input-container">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`form-control custom-input ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Tối thiểu 8 ký tự"
                                value={formData.password}
                                onChange={handleChange}
                              />
                              <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </span>
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            </div>
                          </div>

                          {/* XÁC NHẬN MẬT KHẨU - ĐÃ ĐỔI THÀNH COL-12 ĐỂ CHIẾM 1 HÀNG */}
                          <div className="col-md-12 mb-3">
                            <label className="form-label small fw-bold">
                              Xác nhận mật khẩu
                            </label>
                            <div className="password-input-container">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={`form-control custom-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                                placeholder="Nhập lại mật khẩu"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                              />
                              <span
                                className="password-toggle"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </span>
                              <div className="invalid-feedback">
                                {errors.confirmPassword}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="form-check small">
                            <input
                              className={`form-check-input ${errors.agreeTerms ? "is-invalid" : ""}`}
                              type="checkbox"
                              id="agreeTerms"
                              name="agreeTerms"
                              checked={formData.agreeTerms}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="agreeTerms"
                            >
                              Tôi đồng ý với{" "}
                              <span>Điều khoản & Chính sách</span>
                            </label>
                          </div>
                        </div>

                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn register-btn"
                            disabled={loading}
                          >
                            {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                          </button>
                        </div>
                      </form>

                      <div className="register-text mt-4">
                        Đã có tài khoản?{" "}
                        <Link to="/login">
                          <span>Đăng nhập ngay</span>
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

export default Register;
