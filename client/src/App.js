import "./App.css";
import Login from "./pages/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./pages/Chat";
import Register from "./pages/auth/Register";
import SnackBar from "./components/common/SnakBar";
import React from "react";
import { setOpen } from "./redux/actions/snackbar.action";
import { useMediaQuery } from "@mui/material";
import ChatBox from "./components/chat/chatbox/ChatBox";

function App() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const { selectedConversation } = useSelector((state) => state.chat);
  const { theme } = useSelector((state) => state.setting);
  const { open, message, severity, verticalP, horizontalP } = useSelector(
    (state) => state.snackbar
  );
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <div className={`theme-${theme}`}>
      <SnackBar
        open={open}
        handleClose={() => dispatch(setOpen(false))}
        severity={severity}
        verticalP={verticalP}
        horizontalP={horizontalP}
      >
        {message}
      </SnackBar>
      <Routes>
        <Route
          path={"/"}
          element={
            authData ? <Navigate to={"chat"} /> : <Navigate to={"login"} />
          }
        />
        <Route
          path={"/login"}
          element={authData ? <Navigate to={"../chat"} /> : <Login />}
        />
        <Route
          path={"/register"}
          element={authData ? <Navigate to={"../chat"} /> : <Register />}
        />
        <Route
          path={"/chat"}
          element={
            authData ? (
              selectedConversation._id ? (
                <Navigate to={"message"} />
              ) : (
                <Chat />
              )
            ) : (
              <Navigate to={"../login"} />
            )
          }
        />
        <Route
          path={"/chat/message"}
          element={
            authData ? (
              isSmallScreen ? (
                <ChatBox />
              ) : (
                <Chat />
              )
            ) : (
              <Navigate to={"../login"} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
