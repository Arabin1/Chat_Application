import "./App.css";
import Login from "./pages/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat";
import Register from "./pages/auth/Register";

function App() {
  const authData = useSelector((state) => state.authReducer.authData);
  const { theme } = useSelector((state) => state.settingReducer);

  return (
    <div className={`theme-${theme}`}>
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
