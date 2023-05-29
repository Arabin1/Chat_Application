import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import me from "../../assets/demo/me.jpg";
import Avatar from "./Avatar";

function CustomDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      About the Developer
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

export default function AboutDialog({ open, setOpen }) {
  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <CustomDialogTitle
        id="customized-dialog-title"
        onClose={() => setOpen(false)}
      />
      <DialogContent>
        <div className={"about-me"}>
          <Avatar src={me} alt={"Arabin"} height={120} width={120} />
          <h3>Md. Asaduzzaman (Arabin)</h3>
          <p>
            Full Stack Developer with expertise in MERN, Laravel, and React
            Native.
          </p>
          <span>
            For more info, Please{" "}
            <a
              href={"https://arabin.vercel.app"}
              target={"_blank"}
              rel={"noreferrer"}
            >
              Visit
            </a>{" "}
            my portfolio.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
