import uploader from '../../utils/uploader.util.js';

export const singleImageUpload = (folder, fieldName) => (req, res, next) => {
  const upload = uploader(
    folder,
    1,
    ['image/jpg', 'image/jpeg', 'image/png'],

    1024 * 1024, // 1 MB
    'Only .jpg, .jpeg or .png format allowed!'
  );

  upload.single(fieldName)(req, res, (err) => {
    if (err) {
      if (err.message === 'File too large') {
        res.status(400).json({
          errors: {
            avatar: {
              msg: 'File size must be less than or equal to 1MB',
            },
          },
        });
      } else {
        res.status(400).json({
          errors: {
            avatar: {
              msg: err.message,
            },
          },
        });
      }
    } else {
      next();
    }
  });
};

export const multiImageUpload = (folder, maxFiles) => (req, res, next) => {
  const upload = uploader(
    folder,
    maxFiles,
    ['image/jpg', 'image/jpeg', 'image/png'],

    1024 * 1024,
    'Only .jpg, .jpeg or .png format allowed!'
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      if (err.message === 'File too large') {
        res.status(400).json({
          errors: {
            avatar: {
              msg: 'File size must be less than or equal to 1MB',
            },
          },
        });
      } else {
        res.status(400).json({
          errors: {
            avatar: {
              msg: err.message,
            },
          },
        });
      }
    } else {
      next();
    }
  });
};
