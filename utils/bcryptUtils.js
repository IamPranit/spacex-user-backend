const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err);
  }
};

const comparePasswordWithHash = async (receivedPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(receivedPassword, hashedPassword);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { hashPassword, comparePasswordWithHash };
