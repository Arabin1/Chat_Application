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
import BlankBox from "../../common/BlankBox";
import { ChatBubble, MessageRounded } from "@mui/icons-material";
import Progress from "../../common/Progress";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const dispatch = useDispatch();
  const [userMessage, setUserMessage] = useState("");
  const { messages, selectedConversation, loadingMsg } = useSelector(
    (state) => state.chat
  );
  const userId = useSelector((state) => state.auth.authData.user._id);
  const navigate = useNavigate();

  let renderSeen = true;

  useEffect(() => {
    if (selectedConversation._id)
      dispatch(getConversationMessages(selectedConversation._id));
    else navigate("/chat");
  }, [selectedConversation, dispatch, navigate]);

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
          {messages.length === 0 ? (
            loadingMsg ? (
              <Progress size={30} />
            ) : (
              <BlankBox text={"Start sending private message!"}>
                <MessageRounded fontSize={"large"} />
              </BlankBox>
            )
          ) : (
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
          )}
          <Footer
            handleSubmit={handleSubmit}
            message={userMessage}
            setMessage={setUserMessage}
          />
        </>
      ) : (
        <BlankBox text={"Send private message to your friend!"}>
          <ChatBubble fontSize={"large"} />
        </BlankBox>
      )}
    </div>
  );
};

export default ChatBox;
