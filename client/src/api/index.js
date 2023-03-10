import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Users Api
export const insertUser = (payload) => api.post(`/user`, payload);
export const userToken = (id, payload) => api.post(`/userToken/${id}`, payload);
export const getAllUser = (id, payload) => api.post(`/users/${id}`, payload);
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = (id) => api.delete(`/user/${id}`);
export const getUserById = (id) => api.get(`/user/${id}`);
export const userSignIn = (payload) => api.post(`/userSignIn`, payload);
// Books Api
export const search = (find,payload) => api.post(`/book/${find}`, payload);
export const searchAll = (payload) => api.get(`/bookSearch`, payload);
export const addBook = (payload) => api.post(`/book`, payload);
// export const updatebook = (payload) => api.post(`/book/${search}`, payload);
export const remBook = (id,token,payload) => api.delete(`/book/${id}/${token}`,payload);

const apis = {
  insertUser,
  userToken,
  getAllUser,
  updateUserById,
  deleteUserById,
  userSignIn,
  search,
  searchAll,
  addBook,
  // updatebook,
  remBook
};

export default apis;
