import React from "react";
import { Grid } from "@mui/material";
import ChatBox from "../components/chat/chatbox/ChatBox";
import "../styles/chat/chat.css";
import AppLogo from "../components/chat/leftside/AppLogo";
import SearchBar from "../components/chat/leftside/SearchBar";
import { useEffect, useState } from "react";
import { getUserConversations } from "../redux/api/chat.request";
import { useSelector } from "react-redux";
import Conversation from "../components/chat/leftside/Conversation";
import Footer from "../components/chat/leftside/Footer";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [chatBoxUser, setChatBoxUser] = useState(null);

  const { authData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await getUserConversations(authData.access_token);
        setConversations(data.conversations);
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, [authData]);

  const handleClick = (conversation) => {
    setSelectedConversationId(conversation._id);
    const { user } = authData;
    if (conversation.creatorPeopleId._id === user._id) {
      setChatBoxUser(conversation.participantPeopleId);
    } else {
      setChatBoxUser(conversation.creatorPeopleId);
    }
  };

  return (
    <Grid container>
      <Grid item sm={4} xs={12}>
        <div className={"left-side"}>
          <AppLogo />
          <SearchBar />
          <div className={"conversations"}>
            {conversations.map((conversation, id) => (
              <div key={id} onClick={() => handleClick(conversation)}>
                <Conversation
                  conversation={conversation}
                  online={true}
                  selected={conversation._id === selectedConversationId}
                />
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </Grid>
      <Grid item sm={8} xs={12}>
        <ChatBox user={chatBoxUser} conversationId={selectedConversationId} />
      </Grid>
    </Grid>
  );
};

export default Chat;
