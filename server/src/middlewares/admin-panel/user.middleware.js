import { check, validationResult } from 'express-validator';

const userValidator = [
  check('role')
    .isLength({ min: 1 })
    .withMessage('Role is required.')
    .custom((value) => value === 'user' || value === 'admin')
    .withMessage('Role must be user or admin!'),
];

const userValidatorHandler = (req, res, next) => {
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

export { userValidator, userValidatorHandler };
