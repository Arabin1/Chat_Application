import React from "react";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { ArrowBack, Delete } from "@mui/icons-material";
import { IconButton, Avatar as MUIAvatar, useMediaQuery } from "@mui/material";
import ToolTip from "../Tooltip";
import AlertDialog from "../../common/AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConversation,
  setDeleteUserDialog,
} from "../../../redux/actions/chat.action";
import Avatar from "../../common/Avatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { selectedConversation, deleteDialogOpen } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const { people } = selectedConversation;

  return (
    <div className={"header"}>
      {isSmallScreen && (
        <div style={{ paddingLeft: "-5px" }}>
          <IconButton onClick={() => navigate("/chat")}>
            <ArrowBack />
          </IconButton>
        </div>
      )}
      <div className={"user"}>
        <div className={"online-dot-box"} />
        <Avatar
          src={
            people.image
              ? process.env.REACT_APP_IMAGES_FOLDER + `/users/${people.image}`
              : defaultPP
          }
          alt={people.firstname}
          width={55}
          height={55}
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
          <MUIAvatar>
            <Delete />
          </MUIAvatar>
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
