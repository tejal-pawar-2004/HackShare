const User = require("../models/users");

module.exports.showSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Create user with role (either 'user' or 'admin')
    const newUser = new User({ username, email, role });
    const registeredUser = await User.register(newUser, password);

    req.flash("success", "You have registered successfully!");
    console.log("Registered User:", registeredUser);
    res.redirect("/login");
  } catch (err) {
    req.flash("error", err.message);
    console.error(err);
    res.redirect("/signup");
  }
};

module.exports.showLoginPage = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  const loggedInUser = req.user;
  req.flash("success", `Welcome back, ${loggedInUser.username}!`);

  // Redirect based on role
  if (loggedInUser.role === "admin") {
    res.redirect("/admin");
  } else {
    let redirectUrl = res.locals.redirectUrl || "/home";
    res.redirect(redirectUrl);
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/login");
  });
};
