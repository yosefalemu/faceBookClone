const ConversationSchema = require("../models/conversations");
const createConversation = async (req, res) => {
  try {
    const chatExists = await ConversationSchema.findOne({
      members: { $all: [req.body.senderId, req.body.recieverId] },
    });
    if (chatExists) {
      return res.status(200).json(chatExists);
    }
    const newChat = await ConversationSchema.create({
      members: [req.body.senderId, req.body.recieverId],
    });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getConversation = async (req, res) => {
  const id = req.params.id;
  try {
    const conversation = await ConversationSchema.find({
      members: { $in: [id] },
    }).sort({ updatedAt: -1 });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateConversation = async (req, res) => {
  const updatedId = req.params.id;
  const updatedAt = Date.now();
  const newConversation = await ConversationSchema.findByIdAndUpdate(
    updatedId,
    { updatedAt },
    { runValidators: true, new: true }
  );
  console.log(newConversation);
  res.status(201).json(newConversation);
};

module.exports = { createConversation, getConversation, updateConversation };
