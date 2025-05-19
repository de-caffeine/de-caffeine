import { useState, useCallback, useEffect } from 'react';
import { signup } from '../../api/auth';
import { AxiosError } from 'axios';
import coffeeBean from '../../assets/images/CoffeeBean.png';
import Button from '../atoms/Button';
import { toast } from 'react-toastify';
import Checkbox from '../atoms/Checkbox';

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
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleSignup = useCallback(async () => {
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
      const signupResponse = await signup(email, fullName, password);
      localStorage.setItem('accessToken', signupResponse.token);
      toast.success(
        <>
          회원가입에 성공하였습니다. <br />
          이제 로그인 해주세요!
        </>,
      );
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

      if (
        axiosError.response?.status === 400 &&
        msg.includes('The email address is already being used.')
      ) {
        setError('이미 존재하는 이메일입니다.');
        return;
      }

      setError(msg);
    }
  }, [
    email,
    fullName,
    password,
    passwordConfirm,
    agree,
    isEmailValid,
    onClose,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSignup();
      }
      if (e.key === 'Escape') {
        onClose(); // ✅ ESC 키로 모달 닫기
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSignup, onClose]);

  return (
    <div
      onClick={onClose}
      className="nanum-gothic-regular fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // ✅ 모달 내부 클릭은 닫힘 방지
        className="dark:bg-dark-card dark:text-dark-text relative rounded-[15px] bg-white p-7 shadow-inner"
      >
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
              <div className="absolute bottom-[-15px] left-2 text-[10px] text-red-500">
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

          <div
            onChange={(e) => setAgree((e.target as HTMLInputElement).checked)}
            className="flex items-center"
          >
            <Checkbox id="agree" />
            <label htmlFor="agree" className="ml-3 text-[12px]">
              이용약관 및 개인정보 수집/이용에 동의합니다
            </label>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <Button onClick={handleSignup} size="l" full>
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
