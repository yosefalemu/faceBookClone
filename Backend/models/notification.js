const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    content: {
      type: String,
      required: [true, "please provide the content for the notification"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationSchema", NotificationSchema);
