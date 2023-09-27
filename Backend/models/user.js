const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide the name"],
      minlength: [3, "name must be minimum length of 3"],
      maxlength: [50, "name must be maximum length of 50"],
    },
    username: {
      type: String,
      required: [true, "please provide the username"],
      minlength: [6, "username must be minimum lenght of 6"],
      unique: true,
    },
    phonenumber: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    online: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: [true, "please provide the email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide valid email",
      ],
      unique: true,
    },
    emailverified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      minlength: [6, "password must be minimum length of 6"],
      required: [true, "please provide the password"],
    },
    profilepicture: {
      type: String,
      default: "",
    },
    coverpicture: {
      type: String,
      default: "",
    },
    descripition: {
      type: String,
      default: "",
    },
    address: {
      country: { type: String, default: "" },
      city: { type: String, default: "" },
      postalcode: { type: String, default: "" },
    },
    relationship: { type: String, default: "" },
    friends: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostSchema",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostSchema",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
      },
    ],
  },
  { timestamps: true }
);
UserSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error("Failed to hash password");
  }
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("UserSchema", UserSchema);
