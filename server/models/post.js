const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: Number,
  title: String,
  likes: Number,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
