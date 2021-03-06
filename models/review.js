const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  type: String,
  title: String,
  review: String,
  rating: Number,
  isactive: Boolean,

  user: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: Schema.Types.ObjectId, ref: "Content" }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
