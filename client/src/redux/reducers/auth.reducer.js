import { AUTH } from "../constants";

const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    errors: null,
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
        errors: action.data?.errors,
      };
    case AUTH.LOG_OUT:
      localStorage.clear();
      return { ...state, loading: false, error: false, authData: null };
    default:
      return state;
  }
};

export default authReducer;
