import express from 'express';
import { login, register } from '../../controllers/auth/auth.controller.js';
import registerValidator from '../../middlewares/auth/register.middleware.js';
import validatorMiddleware from '../../middlewares/common/validator.middleware.js';

const authRoute = express.Router();

// register route
authRoute.post('/register', registerValidator, validatorMiddleware, register);

// login route
authRoute.post('/login', login);

export default authRoute;
