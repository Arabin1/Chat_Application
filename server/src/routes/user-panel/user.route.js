import express from 'express';
import authorizationMiddleware from '../../middlewares/common/authorization.middleware.js';
import {
  getAllUsers,
  removeProfilePic,
  updatePassword,
  updateProfile,
} from '../../controllers/common/user.controller.js';
import validatorImageMiddleware from '../../middlewares/common/validatorImage.middleware.js';
import profileValidator from '../../middlewares/common/user/profile.middleware.js';
import { userImgFolder } from '../../constants/util.constant.js';
import passwordValidator from '../../middlewares/common/user/password.middleware.js';
import validatorMiddleware from '../../middlewares/common/validator.middleware.js';
import { singleImageUpload } from '../../middlewares/common/imageUpload.middleware.js';

const userRoute = express.Router();

const panel = 'user';

// get all users
userRoute.get('/', authorizationMiddleware(panel), getAllUsers);

// update user profile
userRoute.put(
  '/',
  authorizationMiddleware(panel),
  singleImageUpload(userImgFolder, 'image'),
  profileValidator,
  validatorImageMiddleware(userImgFolder),
  updateProfile
);

// update user password
userRoute.put(
  '/password',
  authorizationMiddleware(panel),
  passwordValidator,
  validatorMiddleware,
  updatePassword
);

// remove profile picture
userRoute.delete('/', authorizationMiddleware(panel), removeProfilePic);

export default userRoute;
