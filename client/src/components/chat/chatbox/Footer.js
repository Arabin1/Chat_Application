import React from "react";
import { AttachFile, Send } from "@mui/icons-material";
import InputEmoji from "react-input-emoji";
import {
  setMessage as setSnackbarMessage,
  setOpen,
  setSeverity,
} from "../../../redux/actions/snackbar.action";
import { useDispatch } from "react-redux";

const Footer = ({ message, setMessage, handleSubmit }) => {
  const dispatch = useDispatch();

  return (
    <div className={"chat-box-footer"}>
      <AttachFile
        onClick={() => {
          dispatch(
            setSnackbarMessage(
              "Coming Soon! This feature will be available in the future."
            )
          );
          dispatch(setSeverity("info"));
          dispatch(setOpen(true));
        }}
      />
      <div>
        <InputEmoji
          value={message}
          onEnter={handleSubmit}
          onChange={setMessage}
          borderRadius={10}
          placeholder={"Write your message..."}
        />
      </div>
      <button onClick={handleSubmit}>
        <Send />
      </button>
    </div>
  );
};

export default Footer;
