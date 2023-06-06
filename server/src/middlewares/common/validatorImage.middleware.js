import { unlink } from 'fs';
import { validationResult } from 'express-validator';
import { upFolder } from '../../constants/util.constant.js';

const validatorImageMiddleware = (imageFolder) => (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove the uploaded file
    if (req.file) {
      const { filename } = req.file;
      unlink(`${upFolder}${imageFolder}${filename}`, (err) => {
        console.log(err);
      });
    } else if (req.files && req.files.length) {
      // remove the uploaded files
      for (let i = 0; i < req.files.length; i++) {
        const { filename } = req.files[i];
        unlink(`${upFolder}${imageFolder}${filename}`, (err) => {
          console.log(err);
        });
      }
    }

    res.status(400).json({
      errors: mappedErrors,
    });
  }
};

export default validatorImageMiddleware;
