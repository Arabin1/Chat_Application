import axios from "axios";

export const getUserConversations = (token) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });
  API.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return API.get("/user/conversation");
};

export const getConversationMessages = (token, id) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });
  API.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return API.get(`user/message/${id}`);
};

export const sendMessage = (token, data) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });
  API.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return API.post("/user/message/", data);
};
