import { SETTING } from "../constants";

export const settingReducer = (state = { theme: "default" }, action) => {
  switch (action.type) {
    case SETTING.THEME_CHANGED:
      return {
        ...state,
        theme: state.theme === "default" ? "dark" : "default",
      };
    default:
      return state;
  }
};
