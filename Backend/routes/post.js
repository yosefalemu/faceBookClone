const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  dislikePost,
  commentPost,
  getSinglePost,
} = require("../controllers/post");
router.route("/").post(createPost).get(getAllPosts);
router.route("/:id").get(getUserPosts);
router.route("/like/:id").patch(likePost);
router.route("/dislike/:id").patch(dislikePost);
router.route("/comment/:id").patch(commentPost);
router.route("/getsinglepost/:id").get(getSinglePost);
module.exports = router;
