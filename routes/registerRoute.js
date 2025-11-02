const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const registerController = require("../controller/registerController");

//Show Form Route
router.get(
  "/:id",
  isLoggedIn,
  wrapAsync(registerController.showRegistrationForm)
);

// Handle Form Submission Route
router.post(
  "/:id",
  isLoggedIn,
  wrapAsync(registerController.submitRegistrationForm)
);

module.exports = router;
