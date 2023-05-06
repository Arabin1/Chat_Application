import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { settingReducer } from "./setting.reducer";

export const reducers = combineReducers({ authReducer, settingReducer });
