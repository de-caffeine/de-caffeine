import api from "./index";

// 채널별 포스트
export const getPostsByChannel = (channelId: string, offset?: number, limit?: number) =>
  api.get(`/posts/channel/${channelId}`, { params: { offset, limit } }).then((res) => res.data);

// 작성자별 포스트
export const getPostsByAuthor = (authorId: string, offset?: number, limit?: number) =>
  api.get(`/posts/author/${authorId}`, { params: { offset, limit } }).then((res) => res.data);

// 포스트 생성 (FormData)
export const createPost = (title: string, channelId: string, imageFile?: File) => {
  const form = new FormData();
  form.append("title", title);
  form.append("channelId", channelId);
  if (imageFile) form.append("image", imageFile);

  return api
    .post("/posts/create", form, {
      headers: {
        // 여기에만 multipart/form-data를 지정
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

// 포스트 상세
export const getPost = (postId: string) => api.get(`/posts/${postId}`).then((res) => res.data);

// 포스트 수정 (FormData)
export const updatePost = (
  postId: string,
  title: string,
  channelId: string,
  imageFile: File | null,
  imageToDeletePublicId?: string
) => {
  const form = new FormData();
  form.append("postId", postId);
  form.append("title", title);
  form.append("channelId", channelId);
  if (imageFile) form.append("image", imageFile);
  if (imageToDeletePublicId) form.append("imageToDeletePublicId", imageToDeletePublicId);

  return api
    .put("/posts/update", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

// 포스트 삭제
export const deletePost = (id: string) =>
  api.delete("/posts/delete", { data: { id } }).then((res) => res.data);
