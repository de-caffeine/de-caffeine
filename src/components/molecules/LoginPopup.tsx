import { useState } from 'react';
import { login } from '../../api/auth'; // 로그인 API
import { AxiosError } from 'axios';
import coffeeBean from '../../assets/images/CoffeeBean.svg';

export default function LoginPopup({
  onClose,
  onSwitchToSignup,
}: {
  onClose: () => void;
  onSwitchToSignup: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const res = await login(email, password);
      localStorage.setItem('accessToken', res.token); // 로그인 성공 시 토큰 저장
      onClose(); // 팝업 닫기
    } catch (err) {
      let msg = '알 수 없는 오류가 발생했습니다.';
      const axiosError = err as AxiosError<{ message?: string }>;
      msg =
        (typeof axiosError.response?.data === 'string'
          ? axiosError.response.data
          : axiosError.response?.data?.message) ||
        axiosError.message ||
        msg;

      // 이메일 중복 오류 처리
      if (
        axiosError.response?.status === 400 &&
        msg.includes(
          'Your email and password combination does not match an account.',
        )
      ) {
        setError('이메일 또는 패스워드가 일치하지 않습니다.');
        console.log(msg);
        return;
      }

      setError(msg);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="nanum-gothic-regular relative rounded-[15px] bg-white p-7 shadow-inner">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 h-5 w-5 cursor-pointer"
        >
          ✕
        </button>
        <div className="flex items-center pt-1 pb-3">
          <div className="text-[32px]">Log In</div>
          <img
            src={coffeeBean}
            alt="coffeeBeanIcon"
            className="translate-1 translate-y-1"
          />
        </div>
        <div className="text-[16px]">디:카페인에 오신 것을 환영합니다!</div>

        <div className="flex flex-col gap-4 pt-7">
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[50px] w-[350px] rounded-[5px] border p-3"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[50px] w-[350px] rounded-[5px] border p-3"
          />

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            onClick={handleLogin}
            className="mt-2 h-[50px] w-full cursor-pointer rounded-[5px] bg-[#6b4c36] text-[20px] text-white"
          >
            로그인
          </button>
          <button
            onClick={onSwitchToSignup}
            className="h-[50px] w-full cursor-pointer rounded-[5px] border text-[20px]"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
