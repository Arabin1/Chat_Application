import { UI } from "../constants";

export const setOpen = (value) => (dispatch) => {
  dispatch({ type: UI.SET_OPEN, data: value });
};

export const openSnackbar =
  (message, severtiy = "error") =>
  (dispatch) => {
    dispatch({ type: UI.SET_MESSAGE, data: message });
    dispatch({ type: UI.SET_SEVERITY, data: severtiy });
    dispatch({ type: UI.SET_OPEN, data: true });
  };

export const openSnackBarForAxiosError =
  (message, severity = "warning") =>
  (dispatch) => {
    dispatch({ type: UI.SET_MESSAGE, data: message });
    dispatch({ type: UI.SET_SEVERITY, data: severity });
    dispatch({ type: UI.SET_VERTICAL_POSITION, data: "bottom" });
    dispatch({ type: UI.SET_HORIZONTAL_POSITION, data: "left" });
    dispatch({ type: UI.SET_OPEN, data: true });
  };
