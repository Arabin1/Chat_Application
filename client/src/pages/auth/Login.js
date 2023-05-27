import React, { useState } from "react";
import "../../styles/auth.css";
import AuthLayout from "../../components/auth/AuthLayout";
import {
  EmailInput,
  PasswordInput,
} from "../../components/auth/InputComponent";
import Logo from "../../components/auth/Logo";
import MyButton from "../../components/auth/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { Alert, Collapse, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  setMessage,
  setOpen,
  setSeverity,
} from "../../redux/actions/snackbar.action";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(true);

  const { errors, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(login(data));
    if (errors) setAlert(true);
  };

  return (
    <AuthLayout>
      <form className={"auth-section"} onSubmit={handleSubmit}>
        <Logo />
        <h2>Log into your Account</h2>
        <span>Welcome back! Just log in</span>
        <EmailInput value={email} helperText={false} onChange={setEmail} />
        <PasswordInput
          error={false}
          onChange={setPassword}
          label={"Password"}
        />
        <div className={"remember-section"}>
          <Link to={"#"} className={"link"}>
            <span
              onClick={() => {
                dispatch(
                  setMessage(
                    "Coming Soon! This feature will be available in the future."
                  )
                );
                dispatch(setSeverity("info"));
                dispatch(setOpen(true));
              }}
            >
              Forgot password?
            </span>
          </Link>
        </div>
        <MyButton loading={loading}>Log in</MyButton>

        <p>
          Don't have an account?{" "}
          <Link to={"../register"} className={"link"}>
            Create an account
          </Link>
        </p>

        {errors?.common && (
          <Collapse in={alert}>
            <Alert
              severity={"error"}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errors.common?.msg}
            </Alert>
          </Collapse>
        )}
      </form>
    </AuthLayout>
  );
};

export default Login;
