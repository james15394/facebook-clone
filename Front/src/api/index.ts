import axios from "axios";

const url = "http://localhost:9890/";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: any) =>
  axios.post(url, newPost, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id: any, updatedPost: any) =>
  axios.patch(`${url}update/${id}`, updatedPost, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deletePost = (id: string | number) =>
  axios.delete(`${url}delete/${id}`);
