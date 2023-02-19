const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const db = process.env.ATLAS_URI;
mongoose.set('strictQuery', true);
const dbConnect = async () => {
  await mongoose
    .connect(db)
    .then(() => {
      console.log('Connected to MDB_ATLAS');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB', err);
    });
};
dbConnect();

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
