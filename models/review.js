const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  type: String,
  title: String,
  coment: String,
  rating: Number
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
