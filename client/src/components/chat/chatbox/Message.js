import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import Avatar from "../../common/Avatar";

const Message = ({ message, receiver, renderSeen }) => {
  const { user } = useSelector((state) => state.auth.authData);

  const isReceivedMsg = message.sender !== user._id;

  return (
    <div className={isReceivedMsg ? "receiver" : "sender"}>
      <div>
        {isReceivedMsg && (
          <Avatar
            src={
              receiver.image
                ? process.env.REACT_APP_IMAGES_FOLDER +
                  `/users/${receiver.image}`
                : defaultPP
            }
            alt=""
            width={45}
            height={45}
          />
        )}
        <div>
          {message.deleted ? (
            <div className={"deleted-message"}>This message was deleted</div>
          ) : (
            <>
              {message.text && <div className={"message"}>{message.text}</div>}
              {message.attachments.map((image, index) => (
                <img
                  alt=""
                  key={index}
                  src={
                    process.env.REACT_APP_IMAGES_FOLDER +
                    `/message-attachments/${image}`
                  }
                  className={"message-img"}
                />
              ))}
            </>
          )}
          <div className={"m-details"}>
            <span>{format(message.updatedAt)}</span>
            {renderSeen && (
              <Avatar
                src={
                  receiver.image
                    ? process.env.REACT_APP_IMAGES_FOLDER +
                      `/users/${receiver.image}`
                    : defaultPP
                }
                alt={receiver.firstname}
                width={14}
                height={14}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
