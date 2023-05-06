import React from "react";
import defaultPP from "../../../assets/default/defaultProfile.jpg";

const Header = ({ image, firstname, lastname }) => {
  return (
    <div className={"header"}>
      <img
        src={
          image
            ? process.env.REACT_APP_PUBLIC_API_FOLDER + `/user/${image}`
            : defaultPP
        }
        alt={firstname}
      />
      <h3>
        {firstname} {lastname}
      </h3>
    </div>
  );
};

export default Header;
