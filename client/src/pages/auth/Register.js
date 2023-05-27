import React from "react";
import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import Logo from "../../components/auth/Logo";
import {
  EmailInput,
  Firstname,
  Lastname,
  PasswordInput,
} from "../../components/auth/InputComponent";
import { Link } from "react-router-dom";
import MyButton from "../../components/auth/Button";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/auth.action";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const { errors, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = {
        email,
        password,
        firstname,
        lastname,
      };
      dispatch(register(data));
    }
  };

  return (
    <AuthLayout>
      <form className={"auth-section"} onSubmit={handleSubmit}>
        <Logo />
        <h2>Register a new Account</h2>
        <span>Welcome! Just register</span>
        <Firstname
          helperText={errors?.firstname?.msg}
          onChange={setFirstname}
          value={firstname}
        />
        <Lastname
          value={lastname}
          helperText={errors?.lastname?.msg}
          onChange={setLastname}
        />
        <EmailInput helperText={errors?.email?.msg} onChange={setEmail} />
        <PasswordInput
          error={errors?.password}
          helperText={errors?.password?.msg}
          onChange={setPassword}
          label={"Password"}
        />
        <PasswordInput
          onChange={setConfirmPassword}
          label={"Confirm Password"}
          error={password !== confirmPassword}
          helperText={"Password didn't matched!"}
        />
        <MyButton loading={loading}>Register</MyButton>

        <p>
          Already have an account?{" "}
          <Link to={"../login"} className={"link"}>
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
