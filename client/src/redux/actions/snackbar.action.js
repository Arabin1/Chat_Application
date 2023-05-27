import { UI } from "../constants";

export const setMessage = (value) => (dispatch) => {
  dispatch({ type: UI.SET_MESSAGE, data: value });
};

export const setSeverity = (value) => (dispatch) => {
  dispatch({ type: UI.SET_SEVERITY, data: value });
};

export const setOpen = (value) => (dispatch) => {
  dispatch({ type: UI.SET_OPEN, data: value });
};
