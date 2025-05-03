import api from "./index";

export const createComment = (postId: string, comment: string) =>
  api.post("/comments/create", { postId, comment }).then((res) => res.data);

export const deleteComment = (id: string) =>
  api.delete("/comments/delete", { data: { id } }).then((res) => res.data);
