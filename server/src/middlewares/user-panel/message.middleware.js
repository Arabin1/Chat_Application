import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import createError from 'http-errors';

export const messageValidator = [
  check('senderPeopleId')
    .exists()
    .withMessage('SenderPeopleId is required.')
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw createError('SenderPeopleId should be a valid Object ID.');
      }
    }),
  check('conversationId')
    .exists()
    .withMessage('ConversationId is required.')
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw createError('ConversationId should be a valid Object ID.');
      }
    }),
  check('text')
    .exists()
    .withMessage('Text is required.')
    .isString()
    .withMessage('Text must be a string.!'),
];

export const messageValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: mappedErrors,
    });
  }
};
