import { Post } from "../type/api/products";
import { api } from "./api";

export const getPostsList = async (): Promise<Post[]> => {
  const response = await api.get("/posts");
  return response.data;
};

export const getPostDetails = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const editPostDetails = async (body: Post): Promise<Post> => {
  const response = await api.post("/posts", body, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log("response: ", response);
  return response.data;
};

export const deletePost = async (id: string): Promise<Post> => {
  const response = await api.delete(`/posts/${id}`);
  console.log("response: ", response);
  return response.data;
};

// export const deleteUser = async ({ id, assignedCaId }: UserDeleteParams) => {
//   const response = await api.delete(`/user/${id}`, {
//     params: {
//       assigncaid: assignedCaId,
//     },
//   });
//   return response.data;
// };

// export const editUser = async (id: number, body: EditUserParams) => {
//   const response = await api.patch(`/user/${id}`, body);
//   return response.data;
// };
