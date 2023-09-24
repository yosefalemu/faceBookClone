const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: [true, "please provide the senderUserId"],
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: [true, "please provide the recieverUserId"],
    },
    senderName: {
      type: String,
      required: [true, "please provide the sender name"],
    },
    senderImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("FriendRequestSchema", FriendRequestSchema);
