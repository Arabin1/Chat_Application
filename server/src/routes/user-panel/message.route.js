import express from 'express';
import {
  getConversationMessages,
  storeMessage,
} from '../../controllers/user-panel/message.controller.js';
import authorizationMiddleware from '../../middlewares/common/authorization.middleware.js';
import messageValidator from '../../middlewares/user-panel/message.middleware.js';
import validatorMiddleware from '../../middlewares/common/validator.middleware.js';

const messageRoute = express.Router();

const panel = 'user';

// Store a message
messageRoute.post(
  '/',
  authorizationMiddleware(panel),
  messageValidator,
  validatorMiddleware,
  storeMessage
);

// Get messages of conversation
messageRoute.get('/:id', authorizationMiddleware(panel), getConversationMessages);

export default messageRoute;
