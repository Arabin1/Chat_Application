import { API } from "../constants";

export const logIn = (formData) => API.post("/login", formData);
export const register = (formData) => API.post("/register", formData);
