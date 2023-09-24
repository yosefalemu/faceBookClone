const { BadRequestError } = require("../errors");
const MessageSchema = require("../models/message");
const createMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  if (!conversationId || !sender || !text) {
    throw new BadRequestError("All fields as required to create message");
  }
  try {
    const message = await MessageSchema.create({
      conversationId,
      sender,
      text,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await MessageSchema.find({ conversationId: id });
    res.status(201).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateMessageView = async (req, res) => {
  const id = req.params.id;
  const { isViewed } = req.body;
  try {
    const updatedMessage = await MessageSchema.findByIdAndUpdate(
      id,
      {
        isViewed,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    console.log(`updatedMessage: ${updatedMessage}`);
    res.status(201).json(updatedMessage);
  } catch (error) {}
};
const getUnViewedMessage = async (req, res) => {
  const conversationId = req.params.id;
  const { isViewed, currentUserId } = req.body;
  try {
    const unviewdMessages = await MessageSchema.find({
      conversationId,
      isViewed,
    });
    const unviewdMessage = unviewdMessages.filter(
      (item) => item.sender !== currentUserId
    );
    res.status(200).json(unviewdMessage);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createMessage,
  getMessage,
  updateMessageView,
  getUnViewedMessage,
};
