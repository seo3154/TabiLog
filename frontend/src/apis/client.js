// src/apis/client.js
import axios from "axios";

const client = axios.create({

  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  timeout: 10000,
  // 쿠키/세션 안 쓰면 OFF. 켜면 서버 CORS도 allowCredentials=true + Origin 고정 필요
  // withCredentials: true,

});

// 에러 메시지 통일 (Network Error/타임아웃 가시화)
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.message = "요청 시간 초과(타임아웃)";
    } else if (error.message === "Network Error") {
      error.message = "네트워크 오류(서버 응답 없음/CORS 실패)";
    } else if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export default client;
