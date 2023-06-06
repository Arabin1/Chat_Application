import { UI as SNACKBAR } from "../constants";

export const snackbarReducer = (
  state = {
    message: "There was an unknown error",
    severity: "error",
    open: false,
    verticalP: "top",
    horizontalP: "center",
  },
  action
) => {
  switch (action.type) {
    case SNACKBAR.SET_MESSAGE:
      return {
        ...state,
        message: action.data,
      };
    case SNACKBAR.SET_SEVERITY:
      return {
        ...state,
        severity: action.data,
      };
    case SNACKBAR.SET_VERTICAL_POSITION:
      return {
        ...state,
        verticalP: action.data,
      };
    case SNACKBAR.SET_HORIZONTAL_POSITION:
      return {
        ...state,
        horizontalP: action.data,
      };
    case SNACKBAR.SET_OPEN:
      return {
        ...state,
        open: action.data,
      };
    default:
      return state;
  }
};
