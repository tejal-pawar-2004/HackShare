const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const hackathonController = require("../controller/hackathonController");

//All Hackathons
router.get("/", wrapAsync(hackathonController.allHackathons));

//Show Hackathons Route
router.get("/:id", wrapAsync(hackathonController.showHackathon));

module.exports = router;
