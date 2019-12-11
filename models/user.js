const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,

  contents: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
