import React from "react";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { logout } from "../../../redux/actions/auth.action";
import { useDispatch } from "react-redux";

const ProfileMenu = ({ anchorEl, open, handleClose, image }) => {
  const dispatch = useDispatch();

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 5,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuItem>
        <ListItemIcon>
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "5px",
            }}
            src={
              image
                ? process.env.REACT_APP_PUBLIC_API_FOLDER + `/user/${image}`
                : defaultPP
            }
            alt=""
          />
        </ListItemIcon>
        Edit Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => dispatch(logout())}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
