import express from 'express';
import authorizationMiddleware from '../../middlewares/common/authorization.middleware.js';
import {
  changeUserRole,
  deleteUser,
  getAllUsers,
  getUser,
} from '../../controllers/admin-panel/user.controller.js';
import {
  userValidator,
  userValidatorHandler,
} from '../../middlewares/admin-panel/user.middleware.js';

const userRoute = express.Router();

const panel = 'admin';

userRoute.get('/', authorizationMiddleware(panel), getAllUsers);
userRoute.put(
  '/:id',
  authorizationMiddleware(panel),
  userValidator,
  userValidatorHandler,
  changeUserRole
);
userRoute.get('/:id', authorizationMiddleware(panel), getUser);
userRoute.delete('/:id', authorizationMiddleware(panel), deleteUser);

export default userRoute;
