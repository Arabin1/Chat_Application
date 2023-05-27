import React, { useRef, useState } from "react";
import { EmailInput, Firstname, Lastname } from "../auth/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import defaultPP from "../../assets/default/defaultProfile.jpg";
import MyButton from "../auth/Button";
import { Avatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { updateProfile } from "../../redux/actions/auth.action";
import {
  setMessage,
  setOpen,
  setSeverity,
} from "../../redux/actions/snackbar.action";

const EditProfile = () => {
  const { errors, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth.authData);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
      const isImage = allowedFormats.includes(file.type);
      if (isImage) {
        const maxSizeInBytes = 1024 * 1024; // 1 MB
        if (file.size <= maxSizeInBytes) {
          setSelectedImage(file);
        } else {
          dispatch(setMessage("Maximum 1 MB image size is allowed!"));
          dispatch(setSeverity("error"));
          dispatch(setOpen(true));
        }
      } else {
        dispatch(setMessage("Only .jpg, .png and .jpeg format is allowed!"));
        dispatch(setSeverity("error"));
        dispatch(setOpen(true));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);

    dispatch(updateProfile(formData));
  };

  return (
    <form className={"setting-form"} onSubmit={handleSubmit}>
      <div className={"img-container"}>
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : user.image
              ? process.env.REACT_APP_IMAGES_FOLDER + `/users/${user.image}`
              : defaultPP
          }
          alt={user.firstname}
        />
        <div className={"upload-button"}>
          <IconButton
            color="primary"
            aria-label="avatar"
            size={"small"}
            onClick={() => fileInputRef.current.click()}
          >
            <Avatar>
              <PhotoCamera fontSize={"small"} />
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
                accept="image/*"
              />
            </Avatar>
          </IconButton>
        </div>
      </div>
      <div className={"name"}>
        <Firstname
          helperText={errors?.firstname?.msg}
          onChange={setFirstname}
          value={firstname}
        />
        <Lastname
          value={lastname}
          helperText={errors?.lastname?.msg}
          onChange={setLastname}
        />
      </div>
      <EmailInput
        value={email}
        onChange={setEmail}
        helperText={errors?.email?.msg}
      />
      <MyButton loading={loading}>Update Profile</MyButton>
    </form>
  );
};

export default EditProfile;
