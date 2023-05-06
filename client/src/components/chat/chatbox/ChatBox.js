import React, { useEffect, useState } from "react";
import "../../../styles/chat/chatbox.css";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import {
  getConversationMessages,
  sendMessage,
} from "../../../redux/api/chat.request";
import Message from "./Message";

const ChatBox = ({ user, conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { access_token } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await getConversationMessages(
          access_token,
          conversationId
        );
        setMessages(data.messages);
      } catch (e) {
        console.log(e);
      }
    };
    if (user) getMessages();
  }, [conversationId, access_token, user]);

  const handleSubmit = async () => {
    if (message) {
      const payload = {
        text: message,
        conversationId,
      };

      try {
        const { data } = await sendMessage(access_token, payload);
        setMessages([...messages, data.message]);
        setMessage("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={"chat-box"}>
      {user ? (
        <>
          <Header
            image={user.image}
            firstname={user.firstname}
            lastname={user.lastname}
          />
          <div className={"messages"}>
            {messages.map((message, index) => (
              <Message message={message} key={index} receiver={user} />
            ))}
          </div>
          <Footer
            handleSubmit={handleSubmit}
            message={message}
            setMessage={setMessage}
          />
        </>
      ) : null}
    </div>
  );
};

export default ChatBox;
