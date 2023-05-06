import React from "react";
import { LockClock } from "@mui/icons-material";

const Logo = () => {
  return (
    <div className={"logo"}>
      <LockClock fontSize={"large"} />
      <span> chatting</span>
    </div>
  );
};

export default Logo;
