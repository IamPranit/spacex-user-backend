const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const {
    hashPassword,
    comparePasswordWithHash,
  } = require("../utils/bcryptUtils");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
});

// Hash Password before Save
UserSchema.pre("save", async function () {
  // Hash Password
  hashedPassword = await hashPassword(this.password);

  // Set Password
  this.password = hashedPassword;
});

module.exports = mongoose.model("User", UserSchema);
