import { unlink } from 'fs';
import { validationResult } from 'express-validator';
import { upFolder, userImgFolder } from '../../constants/util.constant.js';

const validatorImageMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove the uploaded file
    if (req.file) {
      const { filename } = req.file;
      unlink(`${upFolder}${userImgFolder}${filename}`, (err) => {
        console.log(err);
      });
    }

    res.status(400).json({
      errors: mappedErrors,
    });
  }
};

export default validatorImageMiddleware;
