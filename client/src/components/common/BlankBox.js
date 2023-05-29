import React from "react";
import { Avatar } from "@mui/material";

const BlankBox = ({ children, text }) => {
  return (
    <div className={"blank-box"}>
      <Avatar sx={{ width: 60, height: 60 }}>{children}</Avatar>
      <p>{text}</p>
    </div>
  );
};

export default BlankBox;
