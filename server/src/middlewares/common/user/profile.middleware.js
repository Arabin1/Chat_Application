import { check } from 'express-validator';
import createError from 'http-errors';
import People from '../../../models/People.js';

const profileValidator = [
  check('firstname')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters.')
    .isLength({ max: 25 })
    .withMessage('Maximum 25 characters for first name.'),
  check('lastname')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters.')
    .isLength({ max: 25 })
    .withMessage('Maximum 25 characters for last name.'),
  check('email')
    .isLength({ min: 1 })
    .withMessage('Email is required.')
    .custom(async (value, { req }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      try {
        if (!emailRegex.test(value)) {
          throw createError(400, 'Email should be a valid email address.');
        }
        const user = await People.findOne({ email: value });
        if (user && !user._id.equals(req.user?._id)) {
          throw createError(409, 'Email has already taken!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
];

export default profileValidator;
