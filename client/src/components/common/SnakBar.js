import React from "react";
import MuiSnackBar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({
  open,
  hideDuration = 6000,
  handleClose,
  children,
  severity,
  verticalP,
  horizontalP,
}) => {
  return (
    <MuiSnackBar
      open={open}
      autoHideDuration={hideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: verticalP, horizontal: horizontalP }}
    >
      <Alert severity={severity} sx={{ width: "100%" }} onClose={handleClose}>
        {children}
      </Alert>
    </MuiSnackBar>
  );
};

export default SnackBar;
