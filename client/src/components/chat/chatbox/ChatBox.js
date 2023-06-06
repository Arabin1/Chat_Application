import React, { useEffect, useState } from "react";
import "../../../styles/chat/chatbox.css";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import {
  conversationReceived,
  getConversationMessages,
  messageReceived,
  sendMessage,
  updateSeenOfConversation,
} from "../../../redux/actions/chat.action";
import { openSnackbar } from "../../../redux/actions/snackbar.action";
import BlankBox from "../../common/BlankBox";
import { ChatBubble, MessageRounded } from "@mui/icons-material";
import Progress from "../../common/Progress";
import { useNavigate } from "react-router-dom";
import socket from "../../../config/socket.config";
import { useRef } from "react";
import { useMediaQuery } from "@mui/material";

const ChatBox = () => {
  const dispatch = useDispatch();
  const [userMessage, setUserMessage] = useState("");
  const [images, setImages] = useState([]);
  const { messages, selectedConversation, loadingMsg } = useSelector(
    (state) => state.chat
  );
  const userId = useSelector((state) => state.auth.authData.user._id);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  let renderSeen = true;

  const currentSelectedConversationId = useRef(selectedConversation._id);

  useEffect(() => {
    currentSelectedConversationId.current = selectedConversation._id;
    socket.on("receive-message", (message) => {
      if (message.conversation === currentSelectedConversationId.current)
        dispatch(updateSeenOfConversation(message.conversation));
      dispatch(messageReceived(message));
    });

    if (isSmallScreen) {
      socket.on("receive-conversation", (conversation) => {
        dispatch(conversationReceived(conversation));
      });
    }

    return () => {
      socket.off("get-users");
      socket.off("receive-message");
      socket.off("receive-conversation");
    };
  }, [selectedConversation._id, dispatch, isSmallScreen]);

  useEffect(() => {
    if (selectedConversation._id)
      dispatch(getConversationMessages(selectedConversation._id));
    else navigate("/chat");
  }, [selectedConversation._id, dispatch, navigate]);

  const handleSubmit = () => {
    if ((userMessage && userMessage.length < 251) || images.length) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++)
        formData.append("images", images[i]);
      formData.append("text", userMessage);
      formData.append("conversationId", selectedConversation._id);

      dispatch(sendMessage(formData));
      setUserMessage("");
      setImages([]);
    } else if (userMessage) {
      dispatch(openSnackbar("Maximum 250 characters for text."));
    }
  };

  const handleImages = (e) => {
    const files = e.target.files;

    let imgFiles = [];

    if (files.length > 3) {
      dispatch(openSnackbar("Maximum 3 images allowed."));
    } else {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
        const isImage = allowedFormats.includes(file.type);
        if (isImage) {
          const maxSizeInBytes = 1024 * 1024; // 1 MB
          if (file.size <= maxSizeInBytes) {
            imgFiles.push(file);
          } else {
            imgFiles = [];
            dispatch(openSnackbar("Maximum 1 MB image size is allowed!"));
            break;
          }
        } else {
          imgFiles = [];
          dispatch(
            openSnackbar("Only .jpg, .png and .jpeg format is allowed!")
          );
          break;
        }
      }
    }

    setImages(imgFiles);
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
              <BlankBox text={"Start sending private message or photo!"}>
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
            handleImages={handleImages}
            images={images}
            setImages={setImages}
          />
        </>
      ) : (
        <BlankBox text={"Send private message or photo to your friend!"}>
          <ChatBubble fontSize={"large"} />
        </BlankBox>
      )}
    </div>
  );
};

export default ChatBox;
