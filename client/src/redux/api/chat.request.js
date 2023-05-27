import { API } from "../constants";

export const getUserConversations = () => API.get("/user/conversation");

export const createConversation = (data) =>
  API.post("/user/conversation", data);

export const getConversationMessages = (id) => API.get(`user/message/${id}`);

export const sendMessage = (data) => API.post("/user/message/", data);

export const updateSeenOfConversation = (id) =>
  API.put(`/user/conversation/${id}`);

export const deleteConversation = (id) => API.delete(`user/conversation/${id}`);
