import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const data = JSON.parse(localStorage.getItem("store"));
    const { auth } = data;
    const { authData } = auth;
    if (authData && authData.access_token) {
      config.headers.Authorization = `Bearer ${authData.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API };

export const AUTH = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAIL: "AUTH_FAIL",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  SET_AUTH_DIALOG: "SET_AUTH_DIALOG",
  LOG_OUT: "LOG_OUT",
};

export const CHAT = {
  CONVERSATION_START: "CONVERSATION_START",
  CONVERSATION_SUCCESS: "CONVERSATION_SUCCESS",
  CONVERSATION_FAIL: "CONVERSATION_FAIL",
  CREATE_CONVERSATION: "CREATE_CONVERSATION",
  MESSAGE_START: "MESSAGE_START",
  MESSAGE_SUCCESS: "MESSAGE_SUCCESS",
  MESSAGE_FAIL: "MESSAGE_FAIL",
  SEND_MESSAGE_SUCCESS: "SEND_MESSAGE_SUCCESS",
  SET_SELECTED_CONVERSATION: "SET_SELECTED_CONVERSATION",
  SET_ADD_USER_DIALOG: "SET_ADD_USER_DIALOG",
  DELETE_CONVERSATION: "DELETE_CONVERSATION",
  SET_DELETE_USER_DIALOG: "SET_DELETE_USER_DIALOG",
};

export const UI = {
  SET_MESSAGE: "SET_MESSAGE",
  SET_SEVERITY: "SET_SEVERITY",
  SET_OPEN: "SET_OPEN",
};

export const SETTING = {
  THEME_CHANGED: "THEME_CHANGED",
};
