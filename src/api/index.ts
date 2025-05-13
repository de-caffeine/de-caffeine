import axios from 'axios';
import { useLoginStore } from '../loginStore';

const api = axios.create({
  baseURL: 'http://13.125.208.179:5010',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 보낼 때 자동으로 JWT 토큰 붙이기
api.interceptors.request.use((config) => {
  const token = useLoginStore.getState().accessToken; // 저장된 토큰 불러오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: alert로 에러 메시지 띄우기
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const msg = err.response?.data || err.message;

    if (status === 401) {
      alert('인증이 필요합니다. 로그인 해주세요.');
    } else if (status >= 500) {
      alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else if (status === 400) {
      alert(`잘못된 요청입니다: ${msg}`);
    } else {
      alert(`에러가 발생했습니다: ${msg}`);
    }

    return Promise.reject(err);
  },
);

export default api;
