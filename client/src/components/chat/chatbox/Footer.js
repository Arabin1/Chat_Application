import React, { useState } from "react";
import { AttachFile, Send } from "@mui/icons-material";
import InputEmoji from "react-input-emoji";

const Footer = ({ message, setMessage, handleSubmit }) => {
  return (
    <div className={"chat-box-footer"}>
      <AttachFile />
      <InputEmoji
        value={message}
        onEnter={handleSubmit}
        onChange={setMessage}
        borderRadius={10}
        placeholder={"Write your message..."}
      />
      <button onClick={handleSubmit}>
        <Send />
      </button>
    </div>
  );
};

export default Footer;
