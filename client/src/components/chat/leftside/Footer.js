import React, { useState } from "react";
import { PersonAdd, Settings } from "@mui/icons-material";
import ToolTip from "../Tooltip";
import SettingsMenu from "./SettingsMenu";

const Footer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={"footer"}>
      <ToolTip placement={"top"} title={"Add Contacts"}>
        <PersonAdd fontSize={"medium"} />
      </ToolTip>
      <ToolTip placement={"top"} title={"Settings"}>
        <Settings onClick={handleClick} fontSize={"medium"} />
      </ToolTip>
      <SettingsMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
};

export default Footer;
