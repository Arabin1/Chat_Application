import React from "react";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import ToolTip from "../Tooltip";
import AlertDialog from "../../common/AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConversation,
  setDeleteUserDialog,
} from "../../../redux/actions/chat.action";

const Header = () => {
  const { selectedConversation, deleteDialogOpen } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  const { people } = selectedConversation;

  return (
    <div className={"header"}>
      <div className={"user"}>
        <div className={"online-dot-box"} />
        <img
          src={
            people.image
              ? process.env.REACT_APP_IMAGES_FOLDER + `/users/${people.image}`
              : defaultPP
          }
          alt={people.firstname}
        />
        <div>
          <h3>
            {people.firstname} {people.lastname}
          </h3>
          <span>Active now</span>
        </div>
      </div>
      <ToolTip title={"Delete this conversation"}>
        <IconButton onClick={() => dispatch(setDeleteUserDialog(true))}>
          <Avatar>
            <Delete />
          </Avatar>
        </IconButton>
      </ToolTip>
      <AlertDialog
        open={deleteDialogOpen}
        setOpen={(value) => dispatch(setDeleteUserDialog(value))}
        title={"Are you sure?"}
        handleConfirm={() =>
          dispatch(deleteConversation(selectedConversation._id))
        }
      >
        After confirming the deletion, this action cannot be undone. All
        messages of you associated with this conversation will be permanently
        removed. You will no longer receive any messages from {people.firstname}{" "}
        unless you initiate a new conversation with him/her again.
      </AlertDialog>
    </div>
  );
};

export default Header;
