const express = require("express");
const router = express.Router();
const postController = require("./controller");

// Get all posts
router.get("/posts", postController.getPosts, postController.sortPosts);

// Increment like count for a post
router.put("/posts/:id/like", postController.incrementLike);

module.exports = router;
