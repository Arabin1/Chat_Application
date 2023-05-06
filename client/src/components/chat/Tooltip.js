import React from "react";
import { Tooltip as MuiTooltip } from "@mui/material";

const ToolTip = ({ title, placement = "bottom", children }) => {
  return (
    <MuiTooltip title={title} arrow placement={placement}>
      {children}
    </MuiTooltip>
  );
};

export default ToolTip;
