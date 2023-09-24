const { BadRequestError } = require("../errors");
const PostSchema = require("../models/post");

// @desc    Create New Post
// @route   Post /api/v1/post
// @access  Public
const createPost = async (req, res) => {
  const { image, userId } = req.body;
  if (!image) {
    throw new BadRequestError("please provide the image");
  }
  if (!userId) {
    throw new BadRequestError("please provide the user");
  }
  const post = await PostSchema.create(req.body);
  res.status(201).json(post);
};
// @desc    Get AllPosts
// @route   Get /api/v1/post
// @access  Public
const getAllPosts = async (req, res) => {
  const posts = await PostSchema.find({});
  res.status(201).json(posts);
};
// @desc    Get User Posts
// @route   Get /api/v1/post/:id
// @access  Public
const getUserPosts = async (req, res) => {
  const id = req.params.id;
  const posts = await PostSchema.find({ userId: id });
  res.status(201).json(posts);
};
// @desc    Get SinglePost
// @route   Get /api/v1/post/getsinglepost/:id
// @access  Public
const getSinglePost = async (req, res) => {
  const id = req.params.id;
  const post = await PostSchema.findById(id);
  if (post) {
    res.status(201).json(post);
  } else {
    throw new BadRequestError("no post for this user");
  }
};
// @desc    Like Post
// @route   Patch /api/v1/post/like/:id
// @access  Public
const likePost = async (req, res) => {
  const updateId = req.params.id;
  const { currentUserId } = req.body;
  const post = await PostSchema.findById(updateId);
  if (!post.like.includes(currentUserId)) {
    const like = post.like.concat(currentUserId);
    const updatedPost = await PostSchema.findByIdAndUpdate(
      updateId,
      {
        like,
      },
      { runValidators: true, new: true }
    );
    res.status(201).json(updatedPost);
  } else {
    const like = post.like.filter((item) => item !== currentUserId);
    const updatedPost = await PostSchema.findByIdAndUpdate(
      updateId,
      {
        like,
      },
      { runValidators: true, new: true }
    );
    res.status(201).json(updatedPost);
  }
};
// @desc    Dislike Post
// @route   Patch /api/v1/post/dislike/:id
// @access  Public
const dislikePost = async (req, res) => {
  const updateId = req.params.id;
  const { currentUserId } = req.body;
  const post = await PostSchema.findById(updateId);
  if (!post.dislike.includes(currentUserId)) {
    const dislike = post.dislike.concat(currentUserId);
    const updatedPost = await PostSchema.findByIdAndUpdate(
      updateId,
      {
        dislike,
      },
      { runValidators: true, new: true }
    );
    res.status(201).json(updatedPost);
  } else {
    const dislike = post.dislike.filter((item) => item !== currentUserId);
    const updatedPost = await PostSchema.findByIdAndUpdate(
      updateId,
      {
        dislike,
      },
      { runValidators: true, new: true }
    );
    res.status(201).json(updatedPost);
  }
};
// @desc    Comment Post
// @route   Patch /api/v1/post/comment/:id
// @access  Public
const commentPost = async (req, res) => {
  const updateId = req.params.id;
  const { currentUserId, commentContent } = req.body;
  const post = await PostSchema.findById(updateId);
  if (post) {
    const createdAt = new Date();
    let comment = post.comment;
    comment.push({ currentUserId, commentContent, createdAt });
    const newPost = await PostSchema.findByIdAndUpdate(
      updateId,
      { comment },
      { runValidators: true, new: true }
    );
    res.status(201).json(newPost);
  } else {
    throw new BadRequestError(
      `There is no post with is ${updateId} for comment`
    );
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  dislikePost,
  commentPost,
  getSinglePost,
};
