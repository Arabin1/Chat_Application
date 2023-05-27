import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { settingReducer } from "./setting.reducer";
import chatReducer from "./chat.reducer";
import { AUTH } from "../constants";
import { snackbarReducer } from "./snackbar.reducer";

const reducers = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  snackbar: snackbarReducer,
  setting: settingReducer,
});

// define the top-level LOG_OUT action
const appReducer = (state, action) => {
  if (action.type === AUTH.LOG_OUT) {
    state = {
      auth: undefined,
      chat: undefined,
      snackbar: undefined,
      setting: state.setting,
    }; // reset the state to its initial values without setting
  }
  return reducers(state, action);
};

export default appReducer;
