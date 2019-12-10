require("dotenv").config();
const mongoose = require("mongoose");
// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = "mongodb://127.0.0.1:27017/blusukan";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
module.exports = db;
