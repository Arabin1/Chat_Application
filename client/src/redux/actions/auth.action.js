import * as AuthApi from "../api/auth.request.js";
import { AUTH } from "../constants";

export const login = (formData) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: AUTH.AUTH_SUCCESS, data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH.AUTH_FAIL, data: e.response.data });
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AuthApi.register(formData);
    dispatch({ type: AUTH.AUTH_SUCCESS, data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH.AUTH_FAIL, data: e.response.data });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: AUTH.LOG_OUT });
};
