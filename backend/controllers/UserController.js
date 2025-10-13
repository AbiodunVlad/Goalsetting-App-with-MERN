const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @routes POST /api/users
// @access Public

// NONASYNCHRONOUS
// const registerUser = (req, res) => {
//   res.json({ message: "Register User" });
// };

// ASYNCHRONOUS
const registerUser = asyncHandler(async (req, res) => {
  // if (!req.body) {
  //   res.status(400);
  //   throw new Error("Request body missing");
  // }

  // OR PUT AN EMPTY OBJECT AFTER req.body WHICH IS PREFERED

  const { name, email, password, phoneNumber } = req.body || {};

  if (!name || !email || !password || !phoneNumber) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
      // password: user.password,
      // confirmPassword: user.confirmPassword,
      // message: user.message,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user details entered.");
  }

  // res.json({ message: "Register User" });
});

// @desc Authenticate a user
// @routes POST /api/users/login
// @access Public

// NON-ASYNCHRONOUS
// const loginUser = (req, res) => {
//   res.json({ message: "Login User" });
// };

// ASYNCHRONOUS
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid login detail. Please check and retry.");
  }

  // res.json({ message: "Login User" });
});

// @desc Get user data
// @routes POST /api/users/me
// @access Private

// NON-ASYNCHRONOUS
// const getMe = (req, res) => {
//   res.json({ message: "User data" });
// };

// ASYNCHRONOUS
const getMe = asyncHandler(async (req, res) => {
  // res.json({ message: "User data displayed" });
  const { _id, name, email, phoneNumber } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    phoneNumber,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

module.exports = { registerUser, loginUser, getMe };
