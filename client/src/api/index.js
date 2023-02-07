import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertUser = (payload) => api.post(`/user`, payload);
export const getAllUser = (id, payload) => api.post(`/users/${id}`, payload)
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = (id) => api.delete(`/user/${id}`);
export const getUserById = (id) => api.get(`/user/${id}`);
export const userSignIn = (payload) => api.post(`/userSignIn`, payload);
export const search = (payload) => api.get(`/book`, payload);
export const addBook = (payload) => api.post(`/book`, payload);


const apis = {
  insertUser,
  getAllUser,
  updateUserById,
  deleteUserById,
  userSignIn,
  search,
  addBook
};

export default apis;
