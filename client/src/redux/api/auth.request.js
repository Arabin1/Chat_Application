import { API } from "../constants";

export const logIn = (formData) => API.post("/login", formData);
export const register = (formData) => API.post("/register", formData);
export const updateProfile = (data) => API.put("/user/user", data);
export const changePassword = (data) => API.put("/user/user/password", data);
