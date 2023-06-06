import express from 'express';
import {
  getConversationMessages,
  storeMessage,
} from '../../controllers/user-panel/message.controller.js';
import authorizationMiddleware from '../../middlewares/common/authorization.middleware.js';
import messageValidator from '../../middlewares/user-panel/message.middleware.js';
import { multiImageUpload } from '../../middlewares/common/imageUpload.middleware.js';
import validatorImageMiddleware from '../../middlewares/common/validatorImage.middleware.js';
import { msgAttachmentFolder } from '../../constants/util.constant.js';

const messageRoute = express.Router();

const panel = 'user';

// Store a message
messageRoute.post(
  '/',
  authorizationMiddleware(panel),
  multiImageUpload(msgAttachmentFolder, 3),
  messageValidator,
  validatorImageMiddleware(msgAttachmentFolder),
  storeMessage
);

// Get messages of conversation
messageRoute.get('/:id', authorizationMiddleware(panel), getConversationMessages);

export default messageRoute;
