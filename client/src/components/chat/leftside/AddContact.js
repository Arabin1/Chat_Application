import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "./SearchBar";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { getUsers } from "../../../redux/api/user.request";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createConversation,
  setAddUserDialog,
} from "../../../redux/actions/chat.action";

function CustomDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      Select to create a conversation
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function AddContact() {
  const dispatch = useDispatch();
  const { dialogOpen } = useSelector((state) => state.chat);
  const [mainUsers, setMainUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const handleClose = () => {
    dispatch(setAddUserDialog(false));
  };

  const getAllUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data.users);
      setMainUsers(data.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [dialogOpen]);

  const handleClick = (id) => {
    const payload = {
      participantPeopleId: id,
    };

    dispatch(createConversation(payload));
  };

  const handleOnChange = (value) => {
    const filteredUser = mainUsers.filter((user) => {
      const name = (user.firstname + " " + user.lastname).toLowerCase();
      const val = value.toLowerCase();

      return name.indexOf(val) > -1 || user.email.indexOf(val) > -1;
    });

    setUsers(filteredUser);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={dialogOpen}
    >
      <CustomDialogTitle id="customized-dialog-title" onClose={handleClose} />
      <DialogContent>
        <div className={"contact"}>
          <SearchBar onChange={handleOnChange} />
          {users.map((user, index) => (
            <div
              className={"contact-user"}
              key={index}
              onClick={() => handleClick(user._id)}
            >
              <img
                src={
                  user.image
                    ? process.env.REACT_APP_IMAGES_FOLDER +
                      `/users/${user.image}`
                    : defaultPP
                }
                alt={user.firstname}
              />
              <div>
                <h4>
                  {user.firstname} {user.lastname}
                </h4>
                <span>{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
