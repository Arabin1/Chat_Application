import express from 'express';
import { login, register } from '../../controllers/auth/auth.controller.js';
import {
  registerValidator,
  registerValidatorHandler,
} from '../../middlewares/auth/register.middleware.js';
import { loginValidator, loginValidatorHandler } from '../../middlewares/auth/login.middleware.js';

const authRoute = express.Router();

// register route
authRoute.post('/register', registerValidator, registerValidatorHandler, register);

// login route
authRoute.post('/login', loginValidator, loginValidatorHandler, login);

export default authRoute;
