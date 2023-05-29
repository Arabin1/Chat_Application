import React, { useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import ChatBox from "../components/chat/chatbox/ChatBox";
import "../styles/chat/chat.css";
import AppLogo from "../components/chat/leftside/AppLogo";
import SearchBar from "../components/chat/leftside/SearchBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "../components/chat/leftside/Conversation";
import AddContactButton from "../components/chat/leftside/AddContactButton";
import {
  getUserConversations,
  setSelectedConversation,
} from "../redux/actions/chat.action";
import BlankBox from "../components/common/BlankBox";
import { MailRounded } from "@mui/icons-material";
import Progress from "../components/common/Progress";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const dispatch = useDispatch();
  const { conversations, loadingCon } = useSelector((state) => state.chat);
  const [filteredConversation, setFilteredConversation] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserConversations());
  }, [dispatch]);

  useEffect(() => {
    setFilteredConversation(conversations);
  }, [conversations]);

  const handleOnChange = (value) => {
    const cons = conversations.filter((conversation) => {
      const name = (
        conversation.people.firstname +
        " " +
        conversation.people.lastname
      ).toLowerCase();
      return name.indexOf(value.toLowerCase()) > -1;
    });

    setFilteredConversation(cons);
  };

  return (
    <Grid container>
      <Grid item lg={1} />
      <Grid item xl={3} lg={4} md={4} sm={5} xs={12}>
        <div className={"left-side"}>
          <AppLogo />
          <SearchBar onChange={handleOnChange} />
          {conversations.length === 0 ? (
            loadingCon ? (
              <Progress size={30} />
            ) : (
              <BlankBox text={"No Inbox!"}>
                <MailRounded fontSize={"large"} />
              </BlankBox>
            )
          ) : (
            <div className={"conversations"}>
              {filteredConversation.map((conversation, id) => (
                <div
                  key={id}
                  onClick={() => {
                    dispatch(setSelectedConversation(conversation));
                    navigate("/chat/message");
                  }}
                >
                  <Conversation
                    conversation={conversation}
                    online={Boolean(id % 2)}
                  />
                </div>
              ))}
            </div>
          )}
          <AddContactButton />
        </div>
      </Grid>
      <Grid item xl={7} lg={6} md={8} sm={7} xs={0}>
        {!isSmallScreen && <ChatBox />}
      </Grid>
      <Grid item lg={1} />
    </Grid>
  );
};

export default Chat;
