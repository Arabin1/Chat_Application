import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Settings from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "../../redux/actions/auth.action";

function CustomDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs() {
  const { dialogOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setDialog(false));
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={dialogOpen}
      PaperProps={{
        style: {
          minHeight: "calc(100vh - 30px)",
        },
      }}
    >
      <CustomDialogTitle id="customized-dialog-title" onClose={handleClose} />
      <DialogContent>
        <Settings />
      </DialogContent>
    </Dialog>
  );
}
