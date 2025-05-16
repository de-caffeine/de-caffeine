import { useState } from 'react';
import { login, signup } from '../../api/auth';
import { AxiosError } from 'axios';
import coffeeBean from '../../assets/images/CoffeeBean.png';

export default function SignupPopup({
  onClose,
  onSwitchToLogin,
}: {
  onClose: () => void;
  onSwitchToLogin: () => void;
}) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); // 이메일 유효성 검사 상태

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const handleSignup = async () => {
    setError('');

    if (!fullName || !email || !password || !passwordConfirm) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agree) {
      setError('약관에 동의해야 가입이 가능합니다.');
      return;
    }
    if (!isEmailValid) {
      setError('유효하지 않은 이메일 주소입니다.');
      return;
    }

    try {
      await signup(email, fullName, password);

      // 회원가입 성공 → 로그인 처리
      const loginResponse = await login(email, password);

      // 로그인 성공 → accessToken 저장
      localStorage.setItem('accessToken', loginResponse.token);
      // 모달 닫기
      onClose();
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
        msg.includes('The email address is already being used.')
      ) {
        setError('이미 존재하는 이메일입니다.');
        console.log(msg);
        return;
      }

      setError(msg);
    }
  };

  return (
    <div className="nanum-gothic-regular fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative rounded-[15px] bg-white p-7 shadow-inner dark:bg-[#1e1e1e] dark:text-[#e0e0e0]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 h-5 w-5 cursor-pointer"
        >
          ✕
        </button>
        <div className="flex items-center pt-1 pb-3">
          <div className="text-[32px]">Sign Up</div>
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
            placeholder="이름"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-[50px] w-[350px] rounded-[5px] border p-3"
          />
          <div className="relative">
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
              className={`h-[50px] w-[350px] rounded-[5px] border p-3 ${!isEmailValid ? 'border-red-500' : ''}`}
            />
            {!isEmailValid && (
              <div className="absolute bottom-[-15px] left-3 text-sm text-[12px] text-red-500">
                이메일 형식이 잘못되었습니다.
              </div>
            )}
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[50px] w-[350px] rounded-[5px] border p-3"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="h-[50px] w-[350px] rounded-[5px] border p-3"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="cursor-pointer accent-[#6b4c36]"
            />
            <div className="ml-3 text-[12px]">
              이용약관 및 개인정보 수집/이용에 동의합니다
            </div>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            onClick={handleSignup}
            className="mt-2 h-[50px] w-full cursor-pointer rounded-[5px] bg-[#6b4c36] text-[20px] text-white"
          >
            회원가입
          </button>
          <button
            onClick={onSwitchToLogin}
            className="h-[50px] w-full cursor-pointer rounded-[5px] border text-[20px] dark:bg-[#505050] dark:text-[#121212]"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
