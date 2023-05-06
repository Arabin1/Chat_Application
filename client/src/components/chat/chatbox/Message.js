import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import defaultPP from "../../../assets/default/defaultProfile.jpg";

const Message = ({ message, receiver }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const isReceivedMsg = message.senderPeopleId !== user._id;

  return (
    <div className={isReceivedMsg ? "receiver" : "sender"}>
      <div>
        {isReceivedMsg && (
          <img
            src={
              receiver.image
                ? process.env.REACT_APP_PUBLIC_API_FOLDER +
                  `/user/${receiver.image}`
                : defaultPP
            }
            alt=""
          />
        )}
        <div className={"message"}>{message.text}</div>
      </div>
      <span>{format(message.updatedAt)}</span>
    </div>
  );
};

export default Message;
