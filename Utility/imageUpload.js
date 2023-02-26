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

    // req.file.name = `${name.split(' ')[0]}-${parseInt(Date.now() / 1000, 10)}`;
    // sharp(req.file.buffer)
    //   .resize(500, 500)
    //   .jpeg({ quality: 50 })
    //   .toFormat('jpeg')
    //   .toFile(`/Users/Public/${req.file.name}`);

    imageData = await cloudinary.uploader.upload(
      `/Users/Public/${req.file.filename}.jpg`,
      {
        folder: folder,
        resource_type: 'image',
      }
    );
  }
  return imageData.secure_url;
};

module.exports = imageUpload;
