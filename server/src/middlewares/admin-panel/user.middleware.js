import { check } from 'express-validator';

const userValidator = [
  check('role')
    .isLength({ min: 1 })
    .withMessage('Role is required.')
    .custom((value) => value === 'user' || value === 'admin')
    .withMessage('Role must be user or admin!'),
];

export default userValidator;
