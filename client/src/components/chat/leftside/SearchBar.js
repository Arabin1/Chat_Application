import React from "react";
import { Search } from "@mui/icons-material";

const SearchBar = ({ onChange }) => {
  return (
    <div className={"search-bar-container"}>
      <Search fontSize={"medium"} />
      <input
        type={"text"}
        placeholder={"Search contacts..."}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
