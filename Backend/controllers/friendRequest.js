const { BadRequestError } = require("../errors");
const FriendRequestSchema = require("../models/friendRequest");
// @desc    Create request
// @route   Post /api/v1/request
// @access  Public
const createRequest = async (req, res) => {
  const { senderId, recieverId } = req.body;
  if (!senderId || !recieverId) {
    throw new BadRequestError(
      "please provide the sender and reciever users Id"
    );
  }
  const friendRequest = await FriendRequestSchema.create(req.body);
  res.status(201).json(friendRequest);
};
// @desc    Delete Request
// @route   Delete /api/v1/request/:id
// @access  Public
const deleteRequest = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await FriendRequestSchema.findByIdAndDelete(id);
  res.status(201).json(deletedUser);
};
// @desc    Get Request
// @route   Get /api/v1/request/:id
// @access  Public
const getRequest = async (req, res) => {
  const id = req.params.id;
  const request = await FriendRequestSchema.find({ recieverId: id });
  res.status(201).json(request);
};
module.exports = { createRequest, deleteRequest, getRequest };
