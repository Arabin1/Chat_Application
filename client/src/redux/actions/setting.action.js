import { SETTING } from "../constants";

export const changeTheme = () => async (dispatch) => {
  dispatch({ type: SETTING.THEME_CHANGED });
};
