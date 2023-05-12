import uploader from '../../utils/uploader.util.js';

const singleImageUpload = (folder, fieldName) => (req, res, next) => {
  const upload = uploader(
    folder,
    fieldName,
    ['image/jpg', 'image/jpeg', 'image/png'],

    1024 * 1024,
    'Only .jpg, .jpeg or .png format allowed!'
  );

  upload.single('image')(req, res, (err) => {
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

export default singleImageUpload;
