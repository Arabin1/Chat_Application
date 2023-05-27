import React from "react";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, online }) => {
  const { selectedConversation } = useSelector((state) => state.chat);

  const userId = useSelector((state) => state.auth.authData.user._id);

  return (
    <div
      className={
        selectedConversation._id === conversation._id
          ? "conversation selected-conversation"
          : "conversation"
      }
    >
      {online && <div className={"online-dot"} />}
      <img
        className={"profile-image"}
        src={
          conversation.people.image
            ? process.env.REACT_APP_IMAGES_FOLDER +
              `/users/${conversation.people.image}`
            : defaultPP
        }
        alt={conversation.people.firstname}
      />
      <div
        className={
          conversation.message?.sender !== userId &&
          (!conversation.seenAt ||
            conversation.seenAt < conversation.message?.createdAt)
            ? "bold-text"
            : ""
        }
      >
        <h3>
          {conversation.people.firstname} {conversation.people.lastname}
        </h3>
        <div className={"seen-container"}>
          {conversation.message && (
            <>
              <span>
                {userId === conversation.message.sender ? "You: " : null}
                {conversation.message.text}
              </span>

              {userId === conversation.message.sender &&
                conversation.people.seenAt > conversation.message.createdAt && (
                  <img
                    className={"seen-img"}
                    src={
                      conversation.people.image
                        ? process.env.REACT_APP_IMAGES_FOLDER +
                          `/users/${conversation.people.image}`
                        : defaultPP
                    }
                    alt={conversation.people.firstname}
                  />
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
