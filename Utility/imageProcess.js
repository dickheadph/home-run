const multer = require('multer');
const AppError = require('../Middlewares/AppError');
//const AsyncHandler = require('../Middlewares/AsyncHandler');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.env.DIRECTORY_PATH}`);
  },
  filename: (req, file, cb) => {
    const type = file.mimetype.split('/')[1];
    const name = file.originalname.split('.')[0];
    cb(null, `${name}-${parseInt(Date.now() / 1000, 10)}.${type}`);
  },
});

//const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please select an image.', 403));
  }
};
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload.single('image');
