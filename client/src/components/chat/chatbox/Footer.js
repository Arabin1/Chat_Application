import React from "react";
import { AttachFile, Send } from "@mui/icons-material";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";
import { IconButton } from "@mui/material";
import ToolTip from "../Tooltip";
import CloseIcon from "@mui/icons-material/Close";

const Footer = ({
  message,
  setMessage,
  handleSubmit,
  handleImages,
  images,
  setImages,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className={"chat-box-footer"}>
      <ToolTip title={"Send photos"}>
        <IconButton onClick={() => fileInputRef.current.click()}>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleImages}
            accept="image/*"
            multiple
          />
          <AttachFile />
        </IconButton>
      </ToolTip>
      {images.length !== 0 && (
        <div className={"image-container"}>
          {images.map((img, index) => (
            <img key={index} src={URL.createObjectURL(img)} alt="" />
          ))}
          <div style={{ marginRight: "-8px" }}>
            <IconButton onClick={() => setImages([])}>
              <CloseIcon fontSize={"small"} />
            </IconButton>
          </div>
        </div>
      )}
      <div className={"input-container"}>
        <InputEmoji
          value={message}
          onEnter={handleSubmit}
          onChange={setMessage}
          borderRadius={10}
          placeholder={"Write your message..."}
        />
      </div>
      <button className={"button"} onClick={handleSubmit}>
        <Send />
      </button>
    </div>
  );
};

export default Footer;
