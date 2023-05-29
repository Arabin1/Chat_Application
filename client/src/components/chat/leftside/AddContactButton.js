import React from "react";
import { PersonAdd } from "@mui/icons-material";
import ToolTip from "../Tooltip";
import { Avatar, IconButton } from "@mui/material";
import AddContact from "./AddContact";
import { setAddUserDialog } from "../../../redux/actions/chat.action";
import { useDispatch } from "react-redux";

const AddContactButton = () => {
  const dispatch = useDispatch();

  return (
    <div className={"add-contact"}>
      <ToolTip placement={"top"} title={"Add Contacts"}>
        <IconButton
          color="primary"
          aria-label="avatar"
          size={"small"}
          onClick={() => dispatch(setAddUserDialog(true))}
          sx={{
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
          }}
        >
          <Avatar>
            <PersonAdd fontSize={"medium"} />
          </Avatar>
        </IconButton>
      </ToolTip>
      <AddContact />
    </div>
  );
};

export default AddContactButton;
