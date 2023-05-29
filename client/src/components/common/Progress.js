import React from "react";
import { CircularProgress } from "@mui/material";

const Progress = ({ size = 20 }) => {
  return (
    <div style={{ color: "var(--button-color)", textAlign: "center" }}>
      <CircularProgress sx={{ mt: 2 }} color={"inherit"} size={size} />
    </div>
  );
};

export default Progress;
