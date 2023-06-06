import * as AUTH_API from "../api/auth.request.js";
import { AUTH } from "../constants";
import { openSnackbar, openSnackBarForAxiosError } from "./snackbar.action";

export const login = (formData) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.logIn(formData);
    dispatch({ type: AUTH.AUTH_SUCCESS, data: data });
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.register(formData);
    dispatch({ type: AUTH.AUTH_SUCCESS, data: data });
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const updateProfile = (payload) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.updateProfile(payload);
    dispatch({ type: AUTH.UPDATE_SUCCESS, data: data.user });

    // handle the snackbar for success
    dispatch(openSnackbar(data.message, "success"));
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const changePassword = (payload) => async (dispatch) => {
  dispatch({ type: AUTH.AUTH_START });

  try {
    const { data } = await AUTH_API.changePassword(payload);
    dispatch({ type: AUTH.UPDATE_SUCCESS, data: data.user });

    // handle the snackbar for success
    dispatch(openSnackbar(data.message, "success"));
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const setErrorsNull = () => (dispatch) => {
  dispatch({ type: AUTH.SET_ERRORS_NULL });
};

export const setDialog = (value) => (dispatch) => {
  dispatch({ type: AUTH.SET_AUTH_DIALOG, data: value });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: AUTH.LOG_OUT });
};

// handling error
const handleError = (e) => (dispatch) => {
  if (e.response) {
    if (e.response.status < 500) {
      dispatch({ type: AUTH.AUTH_FAIL, data: e.response.data.errors });
    } else {
      dispatch(
        openSnackBarForAxiosError(
          "Something went wrong! Please try again later",
          "error"
        )
      );
    }
  } else if (e.request) {
    dispatch(openSnackBarForAxiosError("No Internet connection!"));
    dispatch({ type: AUTH.AUTH_FAIL, data: null });
  } else {
    dispatch(openSnackBarForAxiosError("Something went wrong!", "error"));
    dispatch({ type: AUTH.AUTH_FAIL, data: null });
  }
};
