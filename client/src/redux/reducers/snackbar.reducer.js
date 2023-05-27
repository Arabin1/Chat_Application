import { UI as SNACKBAR } from "../constants";

export const snackbarReducer = (
  state = {
    message: "There was an unknown error",
    severity: "error",
    open: false,
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
    case SNACKBAR.SET_OPEN:
      return {
        ...state,
        open: action.data,
      };
    default:
      return state;
  }
};
