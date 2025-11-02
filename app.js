const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
require("dotenv").config();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const User = require("./models/users");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const experienceRouter = require("./routes/experienceRoute");
const hackathonRouter = require("./routes/hackathonRoute");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");
const registerRouter = require("./routes/registerRoute");

const app = express();
// Session config
app.use(
  session({
    secret: process.env.SECRET, // change this in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Tell Passport to use the User model’s strategy
passport.use(new LocalStrategy(User.authenticate()));

// Serialize & deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const MONGO_URL = "mongodb://127.0.0.1:27017/hackshare";
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//Index Route
app.get(
  "/home",
  wrapAsync(async (req, res) => {
    res.render("listings/index");
  })
);

app.use("/experiance", experienceRouter);
app.use("/hackathons", hackathonRouter);
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/register", registerRouter);

app.get("/about", (req, res) => {
  res.render("listings/about");
});

app.get("/contact", (req, res) => {
  res.render("listings/contact");
});

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.get("/", (req, res) => res.send("Hello, From bakend!"));

app.listen(3000, () => console.log("Server running on port 3000"));
