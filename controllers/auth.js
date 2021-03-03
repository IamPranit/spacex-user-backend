const User = require("../models/User");
const { jwtSend } = require("../utils/jwtUtils");
const { comparePasswordWithHash } = require("../utils/bcryptUtils");

// @desc    Login User
// @route   POST api/v1/users/auth
// @access  Public
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: `Please enter credentials`,
      });
    }

    const user = await User.findOne({ email: email }).select("password _id");

    if (!user) {
      res.status(401).json({
        message: `Invalid credentials`,
      });
    }

    const credMatch = await comparePasswordWithHash(password, user.password);

    if (credMatch) {
      jwtSend(user, "USER", res);
    } else {
      res.status(401).json({
        message: `Invalid credentials`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc    Logout User
// @route   POST api/v1/users/auth
// @access  Public
exports.userLogout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("userAuth", "none", {
        maxAge: 1000,
      })
      .json({
        message: "Successfully Logged Out",
      });
  } catch (err) {
    console.log(err);
  }
};
