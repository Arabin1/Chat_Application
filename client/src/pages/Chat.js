import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import ChatBox from "../components/chat/chatbox/ChatBox";
import "../styles/chat/chat.css";
import AppLogo from "../components/chat/leftside/AppLogo";
import SearchBar from "../components/chat/leftside/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "../components/chat/leftside/Conversation";
import AddContactButton from "../components/chat/leftside/AddContactButton";
import {
  conversationReceived,
  getUserConversations,
  messageReceived,
  setOnlineUsers,
  setSelectedConversation,
} from "../redux/actions/chat.action";
import BlankBox from "../components/common/BlankBox";
import { MailRounded } from "@mui/icons-material";
import Progress from "../components/common/Progress";
import { useNavigate } from "react-router-dom";
import socket from "../config/socket.config";

const Chat = () => {
  const dispatch = useDispatch();
  const { conversations, loadingCon, selectedConversation, onlineUsers } =
    useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth.authData);
  const [filteredConversation, setFilteredConversation] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("new-user-add", user._id);

    return () => {
      socket.off("new-user-add");
    };
  }, [user._id]);

  useEffect(() => {
    socket.on("get-users", (users) => {
      dispatch(setOnlineUsers(users));
    });
    socket.on("receive-conversation", (conversation) => {
      dispatch(conversationReceived(conversation));
    });

    if (isSmallScreen) {
      socket.on("receive-message", (message) => {
        dispatch(messageReceived(message));
      });
    }

    return () => {
      socket.off("get-users");
      socket.off("receive-message");
      socket.off("receive-conversation");
    };
  }, [selectedConversation._id, dispatch, isSmallScreen]);

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

  const getOnlineStatus = (id) => {
    return onlineUsers.find((user) => user.userId === id);
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
                    if (conversation._id !== selectedConversation._id)
                      dispatch(setSelectedConversation(conversation, user._id));
                    navigate("/chat/message");
                  }}
                >
                  <Conversation
                    conversation={conversation}
                    online={!!getOnlineStatus(conversation.people._id)}
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
