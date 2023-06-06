import { check } from 'express-validator';
import mongoose from 'mongoose';
import createError from 'http-errors';
import People from '../../models/People.js';

const conversationValidator = [
  check('participantPeopleId')
    .isLength({ min: 1 })
    .withMessage('ParticipantPeopleId is required.')
    .custom(async (value, { req }) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw createError(400, 'ParticipantPeopleId should be a valid Object ID.');
      }

      const people = await People.findById(value);
      if (!people || req.user._id.equals(people._id)) {
        throw createError(404, 'The participant was not found!');
      }
    }),
];

export default conversationValidator;
