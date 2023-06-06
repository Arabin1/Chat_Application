import express from 'express';
import authorizationMiddleware from '../../middlewares/common/authorization.middleware.js';
import {
  changeUserRole,
  deleteUser,
  getAllUsers,
  getUser,
} from '../../controllers/admin-panel/user.controller.js';
import userValidator from '../../middlewares/admin-panel/user.middleware.js';
import validatorMiddleware from '../../middlewares/common/validator.middleware.js';
import { userImgFolder } from '../../constants/util.constant.js';
import profileValidator from '../../middlewares/common/user/profile.middleware.js';
import validatorImageMiddleware from '../../middlewares/common/validatorImage.middleware.js';
import {
  removeProfilePic,
  updatePassword,
  updateProfile,
} from '../../controllers/common/user.controller.js';
import passwordValidator from '../../middlewares/common/user/password.middleware.js';
import { singleImageUpload } from '../../middlewares/common/imageUpload.middleware.js';

const userRoute = express.Router();

const panel = 'admin';

userRoute.get('/', authorizationMiddleware(panel), getAllUsers);

// update user profile
userRoute.put(
  '/',
  authorizationMiddleware(panel),
  singleImageUpload(userImgFolder, 'image'),
  profileValidator,
  validatorImageMiddleware,
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

// change user role
userRoute.put(
  '/:id',
  authorizationMiddleware(panel),
  userValidator,
  validatorMiddleware,
  changeUserRole
);
userRoute.get('/:id', authorizationMiddleware(panel), getUser);

// remove profile picture
userRoute.delete('/', authorizationMiddleware(panel), removeProfilePic);

userRoute.delete('/:id', authorizationMiddleware(panel), deleteUser);

export default userRoute;
