import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

export const AUTH = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAIL: "AUTH_FAIL",
  UPDATING_START: "UPDATING_START",
  UPDATING_SUCCESS: "UPDATING_SUCCESS",
  UPDATING_FAIL: "UPDATING_FAIL",
  LOG_OUT: "LOG_OUT",
};

export const SETTING = {
  THEME_CHANGED: "THEME_CHANGED",
};
