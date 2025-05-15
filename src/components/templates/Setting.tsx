'use client';

import api from '../../api';
import { useState, useEffect } from 'react';
import Icon from '../atoms/Icon';
import UserAvatar from '../atoms/UserAvatar';
import { updateUser, uploadPhoto } from '../../api/users';
import { getAuthUser } from '../../api/auth';

export default function Setting() {
  const [user, setUser] = useState<User | null>(null); // 사용자 데이터
  const [file, setFile] = useState<File | null>(null); // 프로필 이미지 파일

  const [form, setForm] = useState({
    fullName: '',
    introduction: '',
    tags: '',
    email: '',
    github: '',
    velog: '',
    homepage: '',
  });
  const [darkModeToggle, setDarkModeToggle] = useState(false);

  useEffect(() => {
    // 서버에서 로그인된 사용자 정보 불러오기
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getAuthUser(); // 인증된 사용자 정보 가져오기
        setUser(currentUser); // 상태에 저장
      } catch (error) {
        console.error('사용자 정보를 불러오는 중 오류 발생:', error);
        // 필요시 사용자에게 오류 메시지 표시
      }
    };

    fetchCurrentUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof form,
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return alert('이미지를 선택해주세요.');
    }
    try {
      const result = await uploadPhoto(file, false);
      // isCover = false → 프로필 이미지
      console.log('업로드 성공', result);
      alert('사진이 변경되었습니다');
      const updatedUser = await getAuthUser();
      setUser(updatedUser);
      localStorage.setItem('myImage', updatedUser.image);
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const deletePhoto = (isCover: boolean) => {
    return api
      .delete('/users/delete-photo', { data: { isCover } })
      .then((res) => res.data);
  };

  const handleDeleteImage = async () => {
    try {
      await deletePhoto(false); // false: 프로필 이미지 삭제
      const updatedUser = await getAuthUser(); // 최신 사용자 정보로 갱신
      setUser(updatedUser);
      localStorage.removeItem('myImage');
      alert('기본 프로필 이미지로 변경되었습니다.');
      console.log(updatedUser);
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      alert('이미지 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleApply = async () => {
    if (!form.fullName.trim()) {
      alert('닉네임은 필수 입력 항목입니다.');
      return;
    }
    try {
      const tags = form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      const payload = {
        fullName: form.fullName,
        introduction: form.introduction,
        tags,
        email: form.email,
        github: form.github,
        velog: form.velog,
        homepage: form.homepage,
      };
      await updateUser(payload);
      const updatedUser = await getAuthUser(); // 최신 정보 다시 불러오기
      setUser(updatedUser); // 상태 갱신
      console.log('업데이트된 유저 정보:', updatedUser); // ✅ 콘솔 출력
      alert('변경 사항이 저장되었습니다.');
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const deleteUser = (userId: string) =>
    api
      .delete('/users/delete-user', {
        data: { id: userId },
      })
      .then((res) => res.data);
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      '정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    );
    if (!confirmed || !user) return;

    try {
      await deleteUser(user._id);
      alert('회원 탈퇴가 완료되었습니다.');
      localStorage.removeItem('accessToken'); // 로그인 성공 시 토큰 저장
      localStorage.removeItem('myId');
      localStorage.removeItem('myImage');
      window.location.href = '/'; // 홈 또는 로그인 페이지로 이동
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="nanum-gothic-regular ml-[42px] w-[950px]">
      <div className="mb-[10px] flex">
        <Icon name="leftIcon" />
        <div className="ml-[20px]">설정</div>
      </div>

      <div className="rounded-[5px] border border-[#ababab] p-6">
        <div className="ml-[28px] flex items-end gap-5">
          <UserAvatar size={120} imageUrl={user?.image} />

          <div>
            {/* 파일 선택 input */}
            <input
              type="file"
              accept="image/*" // 이미지 파일만 선택 가능하도록 설정
              onChange={handleFileChange}
              className="cursor-pointer rounded-[5px] border text-[12px]"
            />
          </div>

          <button
            className="h-[28px] w-[94px] cursor-pointer rounded-[5px] bg-[#A9907E] text-[13px] text-white"
            onClick={handleUpload}
          >
            이미지 업로드
          </button>
          <button
            onClick={handleDeleteImage}
            className="h-[28px] w-[94px] cursor-pointer rounded-[5px] border text-[13px]"
          >
            이미지 삭제
          </button>
          <div className="ml-[130px] h-[30px] w-[59px] rounded-4xl border bg-white">
            <button
              className={`h-[28px] w-[28px] transform rounded-2xl bg-[#A9907E] transition-transform duration-300 ease-in-out ${
                darkModeToggle ? 'translate-x-[29px]' : 'translate-x-0'
              }`}
              onClick={() => setDarkModeToggle((prev) => !prev)}
            >
              <div className="ml-[3px]">
                <Icon name="darkModeIcon" size={20} />
              </div>
            </button>
          </div>
        </div>

        <hr className="my-5 border-t border-[#ababab]" />

        <div className="ml-[28px] space-y-6">
          <div>
            <div className="nanum-gothic-bold mb-1">닉네임</div>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleInputChange(e, 'fullName')}
              placeholder="설정할 닉네임을 입력해주세요."
              className="h-[38px] w-[255px] rounded-[5px] border p-3 text-[12px]"
            />
          </div>

          <div>
            <div className="nanum-gothic-bold mb-1">한 줄 소개</div>
            <input
              type="text"
              value={form.introduction}
              onChange={(e) => handleInputChange(e, 'introduction')}
              placeholder="한 줄로 나를 소개해 보세요!"
              className="h-[38px] w-[520px] rounded-[5px] border p-3 text-[12px]"
            />
          </div>

          <div>
            <div className="nanum-gothic-bold mb-1">기술 스택</div>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => handleInputChange(e, 'tags')}
              placeholder="예: React, TypeScript, Node.js"
              className="h-[38px] w-[520px] rounded-[5px] border p-3 text-[12px]"
            />
          </div>

          <div>
            <div className="nanum-gothic-bold mb-1">소셜 정보</div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: 'mailIcon', key: 'email', placeholder: '이메일 주소' },
                {
                  icon: 'githubIcon',
                  key: 'github',
                  placeholder: '깃허브 주소',
                },
                { icon: 'velogIcon', key: 'velog', placeholder: '벨로그 주소' },
                {
                  icon: 'homepageIcon',
                  key: 'homepage',
                  placeholder: '홈페이지 주소',
                },
              ].map(({ icon, key, placeholder }, i) => (
                <div key={i} className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2">
                    <Icon name={icon} />
                  </div>
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      handleInputChange(e, key as keyof typeof form)
                    }
                    placeholder={`${placeholder}를 입력해주세요`}
                    className="h-[38px] w-[200px] rounded-[5px] border pr-3 pl-[36px] text-[12px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="nanum-gothic-bold relative mt-[36px] mb-36 ml-[48px] flex w-[830px]">
        <button
          onClick={handleDeleteAccount}
          className="cursor-pointer text-red-500"
        >
          회원탈퇴
        </button>
        <button
          onClick={handleApply}
          className="absolute right-0 h-[40px] w-[100px] cursor-pointer rounded-[5px] bg-[#A9907E] text-white"
        >
          적용
        </button>
      </div>
    </div>
  );
}
