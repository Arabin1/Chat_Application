import React from "react";
import { useSelector } from "react-redux";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { LockClock } from "@mui/icons-material";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { IconButton } from "@mui/material";
import ToolTip from "../Tooltip";
import AboutDialog from "../../common/AboutDialog";
import Avatar from "../../common/Avatar";

const AppLogo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [aboutDialog, setAboutDialog] = useState(false);
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
        <IconButton onClick={handleClick}>
          <Avatar
            src={
              user.image
                ? process.env.REACT_APP_IMAGES_FOLDER + `/users/${user.image}`
                : defaultPP
            }
            alt={user.firstname}
            width={60}
            height={60}
          />
        </IconButton>
        <div>
          <h3>
            {user.firstname} {user.lastname}
          </h3>
          <span>{user.email}</span>
        </div>
      </div>
      <ToolTip title={"About"}>
        <IconButton onClick={() => setAboutDialog(true)}>
          <LockClock fontSize={"large"} />
        </IconButton>
      </ToolTip>
      <ProfileMenu handleClose={handleClose} anchorEl={anchorEl} open={open} />
      <AboutDialog open={aboutDialog} setOpen={setAboutDialog} />
    </div>
  );
};

export default AppLogo;
