import axios from "axios";

const api = axios.create({
  baseURL: "http://13.125.208.179:5010",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 보낼 때 자동으로 JWT 토큰 붙이기
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // 저장된 토큰 불러오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
