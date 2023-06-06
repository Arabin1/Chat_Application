import { check } from 'express-validator';
import mongoose from 'mongoose';
import createError from 'http-errors';
import Conversation from '../../models/Conversation.js';

const messageValidator = [
  check('conversationId')
    .isLength({ min: 1 })
    .withMessage('ConversationId is required.')
    .custom(async (value, { req }) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw createError(400, 'ConversationId should be a valid Object ID.');
      }

      const conversation = await Conversation.findById(value);
      if (!conversation) {
        throw createError(404, 'The conversation was not found!');
      } else if (
        !req.user._id.equals(conversation.creator.people) &&
        !req.user._id.equals(conversation.participant.people) &&
        req.user._id.equals(conversation.deletedBy)
      ) {
        throw createError(403, 'You are not authorized to access this conversation.');
      }

      return true;
    }),
  check('text').custom((value, { req }) => {
    if (!value && !req.files.length) {
      throw createError(400, 'Text or attachments are required.');
    } else if (value && value.length > 250) {
      throw createError('Maximum 250 characters for text.');
    }
    return true;
  }),
];

export default messageValidator;
