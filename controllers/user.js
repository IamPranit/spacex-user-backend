const User = require("../models/User");
const jwt = require("jsonwebtoken");

// BCrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// @desc    Create Single User
// @route   POST api/v1/users
// @access  Public
const createUser = async (req, res, next) => {
  try {
    // New user data
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc Get user with cookie
// @route GET /api/v1/users/search
// @access Private
const getUserWithCookie = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req._id });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get Single User
// @route   GET api/v1/users/:id
// @access  Private
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!userIdMatch(req)) {
      return res.status(400).json({
        message: `Bad Request`,
      });
    }

    if (!user) {
      res.status(404).json({
        success: true,
        message: `User not found with id ${req.params.id}`,
      });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Matches User ID (req.user) with Request Parameters (params.id) to check if requesting user is loggedIn user.
const userIdMatch = (req) => {
  // req.user._id.valueOf() gives the real value of mongodb ObjectId as per MongoDB Documentation.
  return req.userConsumer._id.valueOf().toString() === req.params.id;
};

module.exports = { createUser, getUserWithCookie, getUser };
