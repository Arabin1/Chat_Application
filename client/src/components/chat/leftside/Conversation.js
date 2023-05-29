import React from "react";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { useSelector } from "react-redux";
import Avatar from "../../common/Avatar";

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
      <Avatar
        src={
          conversation.people.image
            ? process.env.REACT_APP_IMAGES_FOLDER +
              `/users/${conversation.people.image}`
            : defaultPP
        }
        alt={conversation.people.firstname}
        width={55}
        height={55}
      />
      <div
        className={
          conversation.message?.sender !== userId &&
          (!conversation.seenAt ||
            conversation.seenAt < conversation.message?.createdAt)
            ? "bold-text con-detail"
            : "con-detail"
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
                  <Avatar
                    src={
                      conversation.people.image
                        ? process.env.REACT_APP_IMAGES_FOLDER +
                          `/users/${conversation.people.image}`
                        : defaultPP
                    }
                    alt={conversation.people.firstname}
                    width={14}
                    height={14}
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
