const express = require("express");
const { jwtAuthenticate } = require("../middleware/jwtAuth");
const { getSpaceXData, getSpaceXLaunch } = require("../controllers/spacex");

const router = express.Router();

router.post("/", jwtAuthenticate, getSpaceXData);
router.get("/:id", jwtAuthenticate, getSpaceXLaunch);

module.exports = router;