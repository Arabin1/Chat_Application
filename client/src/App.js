import "./App.css";
import Login from "./pages/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./pages/Chat";
import Register from "./pages/auth/Register";
import SnackBar from "./components/common/SnakBar";
import React from "react";
import { setOpen } from "./redux/actions/snackbar.action";

function App() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const { theme } = useSelector((state) => state.setting);
  const { open, message, severity } = useSelector((state) => state.snackbar);

  return (
    <div className={`theme-${theme}`}>
      <SnackBar
        open={open}
        handleClose={() => dispatch(setOpen(false))}
        severity={severity}
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
          path={"/chat"}
          element={authData ? <Chat /> : <Navigate to={"../login"} />}
        />
        <Route
          path={"/login"}
          element={authData ? <Navigate to={"../chat"} /> : <Login />}
        />
        <Route
          path={"/register"}
          element={authData ? <Navigate to={"../chat"} /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;
