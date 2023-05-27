import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PasswordInput } from "../auth/InputComponent";
import MyButton from "../auth/Button";
import { changePassword } from "../../redux/actions/auth.action";

const EditPassword = () => {
  const { errors, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth.authData);
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword === password) {
      const payload = {
        password,
      };

      dispatch(changePassword(payload));
    }
  };

  return (
    <form className={"setting-form"} onSubmit={handleSubmit}>
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
      <MyButton loading={loading}>Update Password</MyButton>
    </form>
  );
};

export default EditPassword;
