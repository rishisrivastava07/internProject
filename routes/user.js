const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");

// SignUp Routes
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { email, username, password } = req.body;
      let newUser = new User({ email, username });

      let registeredUser = await User.register(newUser, password);

      //   console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash(
          "success",
          `${username} is successfully logged in! Welcome to Asset-Performance Analytics Dashboard`
        );
        res.redirect("/assets");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

// Login Routes
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    let { username } = req.body;
    req.flash(
      "success",
      `${username} is successfully logged in! Welcome to Asset-Performance Analytics Dashboard`
    );
    let redirectUrl = res.locals.redirectUrl || "/assets";
    res.redirect(redirectUrl);
  }
);

// Logout Routes
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Successfully logged out!");
    res.redirect("/assets");
  });
});
module.exports = router;
