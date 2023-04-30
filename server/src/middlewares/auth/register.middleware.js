import { check, validationResult } from 'express-validator';
import createError from 'http-errors';
import People from '../../models/People.js';

export const registerValidator = [
  check('firstname').exists().withMessage('Firstname is required.'),
  check('lastname').exists().withMessage('Lastname is required.'),
  check('email')
    .exists()
    .withMessage('Email is required.')
    .custom(async (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      try {
        if (!emailRegex.test(value)) {
          throw createError('Email should be a valid email address.');
        }
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError('Email has already taken!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('password')
    .exists()
    .withMessage('Password is required!')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
    ),
];

export const registerValidatorHandler = (req, res, next) => {
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
