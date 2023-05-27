import React from "react";
import { useSelector } from "react-redux";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { LockClock } from "@mui/icons-material";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const AppLogo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth.authData);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={"app-logo"}>
      <div className={"user-info"}>
        <img
          src={
            user.image
              ? process.env.REACT_APP_IMAGES_FOLDER + `/users/${user.image}`
              : defaultPP
          }
          onClick={handleClick}
          alt={user.firstname}
        />
        <div>
          <h3>
            {user.firstname} {user.lastname}
          </h3>
          <span>{user.email}</span>
        </div>
      </div>
      <LockClock fontSize={"large"} />
      <ProfileMenu handleClose={handleClose} anchorEl={anchorEl} open={open} />
    </div>
  );
};

export default AppLogo;
