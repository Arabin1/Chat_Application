import React, { useRef, useState } from "react";
import { EmailInput, Firstname, Lastname } from "../auth/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import defaultPP from "../../assets/default/defaultProfile.jpg";
import MyButton from "../auth/Button";
import { Avatar as MUIAvatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { updateProfile } from "../../redux/actions/auth.action";
import { openSnackbar } from "../../redux/actions/snackbar.action";
import Avatar from "../common/Avatar";

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
          dispatch(openSnackbar("Maximum 1 MB image size is allowed!"));
        }
      } else {
        dispatch(openSnackbar("Only .jpg, .png and .jpeg format is allowed!"));
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
        <Avatar
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : user.image
              ? process.env.REACT_APP_IMAGES_FOLDER + `/users/${user.image}`
              : defaultPP
          }
          alt={user.firstname}
          width={120}
          height={120}
        />
        <div className={"upload-button"}>
          <IconButton
            color="primary"
            aria-label="avatar"
            size={"small"}
            onClick={() => fileInputRef.current.click()}
          >
            <MUIAvatar>
              <PhotoCamera fontSize={"small"} />
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
                accept="image/*"
              />
            </MUIAvatar>
          </IconButton>
        </div>
      </div>
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
