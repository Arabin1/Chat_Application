import { check, validationResult } from 'express-validator';

export const loginValidator = [
  check('email')
    .isLength({ min: 1 })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email should be a valid email address.'),
  check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required!')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
    ),
];

export const loginValidatorHandler = (req, res, next) => {
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
