import * as AUTH_API from "../api/auth.request.js";
import { AUTH, UI } from "../constants";

export const login = (formData) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.logIn(formData);
    dispatch({ type: AUTH.AUTH_SUCCESS, data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH.AUTH_FAIL, data: e.response?.data });
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.register(formData);
    dispatch({ type: AUTH.AUTH_SUCCESS, data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH.AUTH_FAIL, data: e.response.data });
  }
};

export const updateProfile = (payload) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.updateProfile(payload);
    dispatch({ type: AUTH.UPDATE_SUCCESS, data: data.user });

    // handle the snackbar for success
    dispatch({
      type: UI.SET_MESSAGE,
      data: data.message,
    });
    dispatch({ type: UI.SET_SEVERITY, data: "success" });
    dispatch({ type: UI.SET_OPEN, data: true });
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH.AUTH_FAIL, data: e.response.data });
  }
};

export const changePassword = (payload) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.changePassword(payload);
    dispatch({ type: AUTH.UPDATE_SUCCESS, data: data.user });

    // handle the snackbar for success
    dispatch({
      type: UI.SET_MESSAGE,
      data: data.message,
    });
    dispatch({ type: UI.SET_SEVERITY, data: "success" });
    dispatch({ type: UI.SET_OPEN, data: true });
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH.AUTH_FAIL, data: e.response.data });
  }
};

export const setDialog = (value) => (dispatch) => {
  dispatch({ type: AUTH.SET_AUTH_DIALOG, data: value });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: AUTH.LOG_OUT });
};
