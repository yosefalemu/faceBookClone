const UserSchema = require("../models/user");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const sendEmail = require("../utils/sendEmail");

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
const createUser = async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;
  if (password) {
    if (password !== confirmPassword) {
      throw new BadRequestError("passwords doesnot match");
    }
  }
  const userExists = await UserSchema.findOne({
    $or: [{ email }, { username }],
  });
  if (userExists) {
    if (userExists.username === username) {
      res.status(401);
      throw new BadRequestError("username taken");
    } else {
      res.status(401);
      throw new BadRequestError("email taken");
    }
  }
  const user = await UserSchema.create(req.body);

  if (user) {
    const token = user.createJWT();
    user.token = token;
    await user.save();
    const verificationLink = `http://localhost:3000/${user._id}/verifyemail/${token}`;

    //Send the verification link to the user's email

    await sendEmail(user.email, "Verify Email", verificationLink);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new BadRequestError("Invalid user data");
  }
};

// @desc    Login user
// @route   POST /api/v1/user/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new BadRequestError("email required");
  }
  if (!password) {
    throw new BadRequestError("password required");
  }
  const user = await UserSchema.findOne({ email, emailverified: true });
  if (!user) {
    throw new UnauthenticatedError("Invalid creditials");
  }
  const validPassword = await user.comparePassword(password);
  if (validPassword) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      profilepicture: user.profilepicture,
      gender: user.gender,
      friends: user.friends,
      followers: user.followers,
      following: user.following,
      token: user.token,
    });
  } else {
    throw new UnauthenticatedError("wrong password");
  }
};
// @desc    Verify User Email
// @route   PATCH /api/v1/user/:id/verify-email/:token
// @access  Public
const verifyEmail = async (req, res) => {
  const user = await UserSchema.findOne({
    _id: req.params.id,
    token: req.params.token,
  });
  if (user) {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      { emailverified: true },
      { runValidators: true, new: true }
    );
    if (!updatedUser) {
      throw new UnauthenticatedError("User not found");
    }
    const userWithoutPassword = { ...updatedUser.toObject() };
    delete userWithoutPassword.password;
    res.status(200).json(userWithoutPassword);
  } else {
    throw new UnauthenticatedError("invalid credintial");
  }
};
// @desc    Update user for the basic information and online status
// @route   PATCH /api/v1/user/:id
// @access  Public
const updateUserBasicInfo = async (req, res) => {
  const updateId = req.params.id;
  const {
    online,
    phonenumber,
    gender,
    relationship,
    country,
    city,
    postalcode,
  } = req.body;
  if (online === true || online === false) {
    const user = await UserSchema.findByIdAndUpdate(updateId, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(201).json(user);
  } else {
    if (!phonenumber) {
      throw new BadRequestError("phone number required");
    }
    if (!gender) {
      throw new BadRequestError("please specify your gender");
    }
    if (!relationship) {
      throw new BadRequestError("please sepecify your status");
    }
    if (!country) {
      throw new BadRequestError("please specify your country");
    }
    if (!city) {
      throw new BadRequestError("please specify the city");
    }
    if (!postalcode) {
      throw new BadRequestError("please specify the postalcode");
    }
    const address = {
      country,
      city,
      postalcode,
    };
    const user = await UserSchema.findByIdAndUpdate(
      updateId,
      { phonenumber, gender, relationship, address },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!user) {
      throw new UnauthenticatedError(`Can't update user with Id ${updateId}`);
    }
    res.status(201).json(user);
  }
};
// @desc    Update user for the additional information
// @route   PATCH /api/v1/user/additionalinfo/:id
// @access  Public
const updateUserAdditionalInfo = async (req, res) => {
  const updateId = req.params.id;
  const { profilepicture, coverpicture, descripition } = req.body;
  if (!profilepicture && !coverpicture && !descripition) {
    throw new BadRequestError("please provide one of the fields");
  }
  const user = await UserSchema.findByIdAndUpdate(updateId, req.body, {
    runValidators: true,
    new: true,
  });
  if (!user) {
    throw new UnauthenticatedError(`Can't update user with Id ${updateId}`);
  }
  res.status(201).json(user);
};
// @desc    Update all user information
// @route   PATCH /api/v1/user/allupdate/:id
// @access  Public
const updateAllUserInformation = async (req, res) => {
  const updateId = req.params.id;
  const {
    phonenumber,
    gender,
    profilepicture,
    coverpicture,
    descripition,
    relationship,
    country,
    city,
    postalcode,
  } = req.body;
  const address = {
    country,
    city,
    postalcode,
  };
  const user = await UserSchema.findByIdAndUpdate(
    updateId,
    {
      phonenumber,
      gender,
      profilepicture,
      coverpicture,
      descripition,
      relationship,
      address,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(201).json(user);
};
// @desc    Get All Online Friends
// @route   Get /api/v1/user/online
// @access  Public
const findOnlineUser = async (req, res) => {
  const { online } = req.body;
  const users = await UserSchema.find({ online });
  if (users) {
    res.status(201).json(users);
  } else {
  }
};
// @desc    Get All Users
// @route   Get /api/v1/user
// @access  Public
const getAllUsers = async (req, res) => {
  const users = await UserSchema.find({});
  if (users) {
    res.status(201).json(users);
  } else {
  }
};
// @desc    Get Single User
// @route   Get /api/v1/user/:id
// @access  Public
const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findById(id);
    if (!user) {
      throw new BadRequestError(`there is no user with id ${id}`);
    }
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
// @desc    Confirm Add Friend Request
// @route   Get /api/v1/user/addfriend/:id
// @access  Private
const addFriend = async (req, res) => {
  const updateId = req.params.id;
  const { senderId, recieverId } = req.body;
  if (senderId) {
    const user = await UserSchema.findById(updateId);
    const friends = user.friends.concat(senderId);
    const updateuser = await UserSchema.findByIdAndUpdate(
      updateId,
      { friends },
      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(201).json(updateuser);
  }
  if (recieverId) {
    const user = await UserSchema.findById(updateId);
    const friends = user.friends.concat(recieverId);
    const updateuser = await UserSchema.findByIdAndUpdate(
      updateId,
      { friends },
      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(201).json(updateuser);
  }
};
// @desc    Follow User
// @route   Get /api/v1/user/follow/:id
// @access  Private
const addFollower = async (req, res) => {
  const updateId = req.params.id;
  const { senderId, recieverId } = req.body;
  if (senderId) {
    const user = await UserSchema.findById(updateId);
    const followers = user.followers.concat(senderId);
    const updateuser = await UserSchema.findByIdAndUpdate(
      updateId,
      {
        followers,
      },
      { runValidators: true, new: true }
    );
    res.status(201).json(updateuser);
  }
  if (recieverId) {
    const user = await UserSchema.findById(updateId);
    const following = user.following.concat(recieverId);
    const updateuser = await UserSchema.findByIdAndUpdate(
      updateId,
      {
        following,
      },
      { runValidators: true, new: true }
    );
    res.status(201).json(updateuser);
  }
};

module.exports = {
  createUser,
  loginUser,
  verifyEmail,
  updateUserBasicInfo,
  updateUserAdditionalInfo,
  updateAllUserInformation,
  findOnlineUser,
  getAllUsers,
  getSingleUser,
  addFriend,
  addFollower,
};
