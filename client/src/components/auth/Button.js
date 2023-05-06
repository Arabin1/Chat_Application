import React from "react";
import { Button, CircularProgress } from "@mui/material";

const MyButton = ({ children, loading }) => {
  return (
    <Button variant="contained" type={"submit"}>
      {children}
      {loading && (
        <CircularProgress sx={{ ml: 2 }} color={"inherit"} size={20} />
      )}
    </Button>
  );
};

export default MyButton;
