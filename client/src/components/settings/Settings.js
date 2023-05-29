import React, { useEffect, useState } from "react";
import {
  useMediaQuery,
  Grid,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../../styles/chat/setting.css";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import { changeTheme } from "../../redux/actions/setting.action";
import { useDispatch, useSelector } from "react-redux";

const Settings = ({ closeDialog }) => {
  const [sideBar, setSideBar] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Edit-Profile");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.setting);

  const handleSelection = (value) => {
    if (isSmallScreen) setSideBar(false);
    setSelectedItem(value);
  };

  useEffect(() => {
    setSideBar(!isSmallScreen);
  }, [isSmallScreen]);

  return (
    <div>
      <Grid container className={"setting-container"}>
        {isSmallScreen && (
          <Grid item xs={12}>
            <IconButton onClick={() => setSideBar(!sideBar)}>
              <MenuIcon />
            </IconButton>
          </Grid>
        )}
        {sideBar && (
          <Grid item xs={12} sm={4} xxs={12}>
            <ul className={"list"}>
              <li
                className={selectedItem === "Edit-Profile" ? "selected" : ""}
                onClick={() => handleSelection("Edit-Profile")}
              >
                Edit Profile
              </li>
              <li
                className={selectedItem === "Change-Password" ? "selected" : ""}
                onClick={() => handleSelection("Change-Password")}
              >
                Change Password
              </li>
              <li
                className={selectedItem === "Theme" ? "selected" : ""}
                onClick={() => handleSelection("Theme")}
              >
                Theme
              </li>
            </ul>
          </Grid>
        )}
        <Grid
          item
          xss={12}
          xs={12}
          sm={sideBar ? 8 : 12}
          className={"setting-right"}
        >
          {selectedItem === "Edit-Profile" && (
            <EditProfile closeDialog={closeDialog} />
          )}
          {selectedItem === "Change-Password" && (
            <EditPassword closeDialog={closeDialog} />
          )}
          {selectedItem === "Theme" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={theme !== "default"}
                    onChange={() => dispatch(changeTheme())}
                  />
                }
                label="Dark Mode"
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
