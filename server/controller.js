const Post = require("./models/post");

const sortPosts = async (sortOption) => {
  switch (sortOption) {
    case "newer":
      return await Post.find().sort({ createdAt: -1 });
    case "older":
      return await Post.find().sort({ createdAt: 1 });
    default:
      return await Post.find();
  }
};

const getPosts = async (req, res) => {
  try {
    const sortOption = req.query.sort || "newer";
    const posts = await sortPosts(sortOption);
    res.json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Increment like count of a post

const incrementLike = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOneAndUpdate(
      { id: postId },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Like incremented successfully", post });
  } catch (error) {
    console.error("Error incrementing like:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  getPosts,
  incrementLike,
  sortPosts, // Optionally export the sorting function for reuse
};
