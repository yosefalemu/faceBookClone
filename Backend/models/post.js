const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    image: {
      type: String,
      default: "NoImage",
    },
    descripition: {
      type: String,
      default: "",
    },
    like: {
      type: Array,
      default: [],
    },
    dislike: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PostSchema", PostSchema);
