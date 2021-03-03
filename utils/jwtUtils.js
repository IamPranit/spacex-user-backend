const jwt = require("jsonwebtoken");

// Sign token and return Signed token
const jwtSignToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Send JWT
const jwtSend = async (currentUser, userType, res) => {
  try {
    // Signed JWT / Create JWT
    const token = await jwtSignToken(currentUser._id);

    res
      .status(200)
      .cookie("userAuth", token, {
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        token,
      });
  } catch (err) {
    console.log(err);
  }
};

// Verify JWT
const jwtVerify = (receivedToken) => {
  try {
    return jwt.verify(receivedToken, process.env.JWT_SECRET);
  } catch (err) {
   return err; 
  }
};

module.exports = { jwtSignToken, jwtSend, jwtVerify };
