const cloudinary = require('cloudinary').v2;

const imageUpload = async (req, folder) => {
  let imageData;
  console.log(req.file);
  if (req.file) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    imageData = await cloudinary.uploader.upload(
      `${process.env.DIRECTORY_PATH}/${req.file.filename}.jpg`,
      {
        folder: folder,
        resource_type: 'image',
      }
    );
  }
  return imageData.secure_url;
};

module.exports = imageUpload;
