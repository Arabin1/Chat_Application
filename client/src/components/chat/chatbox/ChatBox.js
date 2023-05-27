import React, { useEffect, useState } from "react";
import "../../../styles/chat/chatbox.css";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import {
  getConversationMessages,
  sendMessage,
} from "../../../redux/actions/chat.action";
import {
  setMessage,
  setOpen,
  setSeverity,
} from "../../../redux/actions/snackbar.action";
import About from "../../common/About";

const ChatBox = () => {
  const dispatch = useDispatch();
  const [userMessage, setUserMessage] = useState("");
  const { messages, selectedConversation } = useSelector((state) => state.chat);
  const userId = useSelector((state) => state.auth.authData.user._id);

  let renderSeen = true;

  useEffect(() => {
    if (selectedConversation._id)
      dispatch(getConversationMessages(selectedConversation._id));
  }, [selectedConversation, dispatch]);

  const handleSubmit = () => {
    if (userMessage && userMessage.length < 251) {
      const payload = {
        text: userMessage,
        conversationId: selectedConversation._id,
      };

      dispatch(sendMessage(payload));
      setUserMessage("");
    } else if (userMessage) {
      dispatch(setMessage("Your text is too long to send!"));
      dispatch(setSeverity("error"));
      dispatch(setOpen(true));
    }
  };

  return (
    <div className={"chat-box"}>
      {selectedConversation._id ? (
        <>
          <Header />
          <div className={"messages"}>
            {messages.map((message, index) => {
              let shouldRenderSeen = false; // We just want to render seen for the latest seen
              if (
                renderSeen &&
                userId === message.sender &&
                selectedConversation.people.seenAt > message.createdAt
              ) {
                shouldRenderSeen = true;
                renderSeen = false;
              }

              return (
                <Message
                  message={message}
                  key={index}
                  receiver={selectedConversation.people}
                  renderSeen={shouldRenderSeen}
                />
              );
            })}
          </div>
          <Footer
            handleSubmit={handleSubmit}
            message={userMessage}
            setMessage={setUserMessage}
          />
        </>
      ) : (
        <About />
      )}
    </div>
  );
};

export default ChatBox;
