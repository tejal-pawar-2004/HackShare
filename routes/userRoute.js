const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/userController");

// Redirect to signup page
router.get("/signup", userController.showSignupForm);

// Create new user or admin
router.post("/signup", wrapAsync(userController.signup));

// Redirect to login page
router.get("/login", userController.showLoginPage);

// Handle login for both user and admin
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(userController.login)
);

// ===== Logout =====
router.get("/logout", userController.logout);

module.exports = router;
