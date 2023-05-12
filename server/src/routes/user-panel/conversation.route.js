import express from 'express';
import authorizationMiddleware from '../../middlewares/common/authorization.middleware.js';

import {
  createConversation,
  deleteConversation,
  getUserConversations,
  updateSeen,
} from '../../controllers/user-panel/conversation.controller.js';
import conversationValidator from '../../middlewares/user-panel/conversation.middleware.js';
import validatorMiddleware from '../../middlewares/common/validator.middleware.js';

const conversationRoute = express.Router();

const panel = 'user';

// create a conversation
conversationRoute.post(
  '/',
  authorizationMiddleware(panel),
  conversationValidator,
  validatorMiddleware,
  createConversation
);

// get user conversations
conversationRoute.get('/', authorizationMiddleware(panel), getUserConversations);

// update when user saw the conversation
conversationRoute.put('/:id', authorizationMiddleware(panel), updateSeen);

// delete a conversation
conversationRoute.delete('/:id', authorizationMiddleware(panel), deleteConversation);

export default conversationRoute;
