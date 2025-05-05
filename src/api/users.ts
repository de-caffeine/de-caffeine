// src/api/users.ts
import api from "./index";

// 전체 사용자
export const getUsers = (offset?: number, limit?: number) =>
  api.get("/users/get-users", { params: { offset, limit } }).then((res) => res.data);

// 온라인 사용자
export const getOnlineUsers = () => api.get("/users/online-users").then((res) => res.data);

// 특정 사용자
export const getUserById = (userId: string) => api.get(`/users/${userId}`).then((res) => res.data);

// 프로필·커버 업로드 (FormData)
export const uploadPhoto = (file: File, isCover: boolean) => {
  const form = new FormData();
  form.append("image", file);
  form.append("isCover", String(isCover));

  return api
    .post("/users/upload-photo", form, {
      headers: {
        // 'Content-Type'을 명시하지 않으면
        // 브라우저가 multipart/form-data; boundary=... 를 자동 설정합니다.
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

// 내 정보 수정
export const updateUser = (fullName: string, username?: string) =>
  api.put("/settings/update-user", { fullName, username }).then((res) => res.data);

// 비밀번호 변경
export const updatePassword = (password: string) =>
  api.put("/settings/update-password", { password }).then((res) => res.data);
