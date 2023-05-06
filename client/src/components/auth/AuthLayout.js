import React from "react";
import { Grid } from "@mui/material";
import AddsSection from "./AddsSection";

const AuthLayout = ({ children }) => {
  return (
    <div className={"auth-layout"}>
      <div className={"main-container"}>
        <Grid container className={"container"}>
          <Grid item lg={6} minHeight={"100%"}>
            {children}
          </Grid>
          <Grid item lg={6} minHeight={"100%"}>
            <AddsSection />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AuthLayout;
