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
        !req.user._id.equals(conversation.participant.people)
      ) {
        throw createError(403, 'You are not authorized to access this conversation.');
      }
    }),
  check('text')
    .isLength({ min: 1 })
    .withMessage('Text is required.')
    .isLength({ max: 250 })
    .withMessage('Maximum 250 characters for text.')
    .isString()
    .withMessage('Text must be a string.'),
];

export default messageValidator;
