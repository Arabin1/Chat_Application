import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import AddsSection from "./AddsSection";
import { setErrorsNull } from "../../redux/actions/auth.action";
import { useDispatch } from "react-redux";

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorsNull());
  }, [dispatch]);

  return (
    <div className={"auth-layout"}>
      <div className={"main-container"}>
        <Grid container className={"container"}>
          <Grid item md={6} sm={12} xs={12} minHeight={"100%"}>
            {children}
          </Grid>
          <Grid item md={6} sm={12} xs={12} minHeight={"100%"}>
            <AddsSection />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AuthLayout;
