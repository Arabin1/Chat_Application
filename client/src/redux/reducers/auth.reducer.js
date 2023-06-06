import { AUTH } from "../constants";

const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    errors: null,
    dialogOpen: false,
  },
  action
) => {
  switch (action.type) {
    case AUTH.AUTH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case AUTH.AUTH_SUCCESS:
      return {
        ...state,
        authData: action.data,
        loading: false,
        error: false,
        errors: null,
      };
    case AUTH.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.data,
      };
    case AUTH.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errors: null,
        authData: { ...state.authData, user: action.data },
        dialogOpen: false,
      };
    case AUTH.SET_ERRORS_NULL:
      return {
        ...state,
        loading: false,
        error: false,
        errors: null,
      };
    case AUTH.SET_AUTH_DIALOG:
      return {
        ...state,
        error: false,
        errors: null,
        dialogOpen: action.data,
      };
    default:
      return state;
  }
};

export default authReducer;
