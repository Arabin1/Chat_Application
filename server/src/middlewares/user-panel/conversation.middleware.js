import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import createError from 'http-errors';
import People from '../../models/People.js';

export const conversationValidator = [
  check('participantPeopleId')
    .exists()
    .withMessage('ParticipantPeopleId is required.')
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw createError('ParticipantPeopleId should be a valid Object ID.');
      }

      const people = await People.findById(value);
      if (!people) {
        throw createError('The participant was not found!');
      }
    }),
];

export const conversationValidatorHandler = (req, res, next) => {
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
