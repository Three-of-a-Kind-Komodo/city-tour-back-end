const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  type: String,
  title: String,
  content: String,
  imageurl: String,
  mapurl: String,
  mapembed: String,
  rating: Number,
  isactive: Boolean,

  user: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});

const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
