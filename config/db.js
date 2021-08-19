const mongoose = require('mongoose');
const config = require('config');
const databaseString = config.get('databaseString');
const connectDB = async () => {
  try {
    await mongoose.connect(databaseString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
