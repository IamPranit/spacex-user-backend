const express = require("express");
const { createUser, getUser } = require("../controllers/user");
const { jwtAuthenticate } = require("../middleware/jwtAuth");

const router = express.Router();

router.route("/").post(createUser);
router.get("/:id", jwtAuthenticate, getUser);

module.exports = router;
