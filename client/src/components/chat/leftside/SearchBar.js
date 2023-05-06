import React from "react";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <div className={"search-bar-container"}>
      <Search fontSize={"medium"} />
      <input type={"text"} placeholder={"Search contacts..."} />
    </div>
  );
};

export default SearchBar;
