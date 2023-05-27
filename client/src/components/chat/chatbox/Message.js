import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import defaultPP from "../../../assets/default/defaultProfile.jpg";

const Message = ({ message, receiver, renderSeen }) => {
  const { user } = useSelector((state) => state.auth.authData);

  const isReceivedMsg = message.sender !== user._id;

  return (
    <div className={isReceivedMsg ? "receiver" : "sender"}>
      <div>
        {isReceivedMsg && (
          <img
            src={
              receiver.image
                ? process.env.REACT_APP_IMAGES_FOLDER +
                  `/users/${receiver.image}`
                : defaultPP
            }
            alt=""
          />
        )}
        <div>
          {message.text ? (
            <div className={"message"}>{message.text}</div>
          ) : (
            <div className={"deleted-message"}>This message was deleted</div>
          )}
          <div className={"m-details"}>
            <span>{format(message.updatedAt)}</span>
            {renderSeen && (
              <img
                className={"seen-img"}
                src={
                  receiver.image
                    ? process.env.REACT_APP_IMAGES_FOLDER +
                      `/users/${receiver.image}`
                    : defaultPP
                }
                alt={receiver.firstname}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
