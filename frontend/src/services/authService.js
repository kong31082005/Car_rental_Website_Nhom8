import api from "./api";

export const loginApi = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data; // { token, user }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
};

export const registerApi = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data; // { token, user }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng ký thất bại");
  }
};
