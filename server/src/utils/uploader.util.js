import multer from 'multer';
import path from 'path';
import createError from 'http-errors';

const uploader = (subFolderPath, maxFiles, allowedFileTypes, maxFileSize, errorMsg) => {
  // file upload folder
  const UPLOADS_FOLDER = `public/uploads/${subFolderPath}`;

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName = `${file.originalname.replace(fileExt, '').replace(' ', '-')}-${Date.now()}`;

      cb(null, fileName + fileExt);
    },
  });

  // prepare the final multer upload object
  return multer({
    storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errorMsg));
      }
    },
  });
};

export default uploader;
