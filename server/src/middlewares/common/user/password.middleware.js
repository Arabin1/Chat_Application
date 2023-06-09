import { check } from 'express-validator';

const passwordValidator = [
  check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required!')
    .isLength({ max: 16 })
    .withMessage('Maximum 16 characters is for password!')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long with at least one lowercase, one uppercase, one number, and one symbol'
    ),
];

export default passwordValidator;
