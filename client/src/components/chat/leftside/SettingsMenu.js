import React from "react";
import { FormControlLabel, Menu, MenuItem, Switch } from "@mui/material";
import { changeTheme } from "../../../redux/actions/setting.action";
import { useDispatch, useSelector } from "react-redux";

const SettingsMenu = ({ anchorEl, open, handleClose }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.settingReducer);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <MenuItem>
        <FormControlLabel
          control={
            <Switch
              checked={theme !== "default"}
              onChange={() => dispatch(changeTheme())}
            />
          }
          label="Dark Mode"
        />
      </MenuItem>
    </Menu>
  );
};

export default SettingsMenu;
