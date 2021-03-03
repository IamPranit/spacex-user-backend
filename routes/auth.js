const express = require("express");

const { userLogin, userLogout } = require("../controllers/auth");

const router = express.Router();

router.post("/login", userLogin);

router.get("/logout", userLogout);

module.exports = router;
