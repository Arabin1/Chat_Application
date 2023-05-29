import React from "react";
import { Avatar as MUIAvatar } from "@mui/material";

const Avatar = ({ src, alt = "", width = 60, height = 60 }) => {
  return <MUIAvatar src={src} alt={alt} sx={{ width, height }} />;
};

export default Avatar;
