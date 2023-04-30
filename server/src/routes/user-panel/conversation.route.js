import express from 'express';
import authorizationMiddleware from '../../middlewares/common/authorization.middleware.js';
import {
  conversationValidator,
  conversationValidatorHandler,
} from '../../middlewares/user-panel/conversation.middleware.js';
import {
  createConversation,
  deleteConversation,
  getUserConversations,
} from '../../controllers/user-panel/conversation.controller.js';

const conversationRoute = express.Router();

const panel = 'user';

// create a conversation
conversationRoute.post(
  '/',
  authorizationMiddleware(panel),
  conversationValidator,
  conversationValidatorHandler,
  createConversation
);

// get user conversations
conversationRoute.get('/', authorizationMiddleware(panel), getUserConversations);

// delete a conversation
conversationRoute.delete('/:id', authorizationMiddleware(panel), deleteConversation);

export default conversationRoute;
