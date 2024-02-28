const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const assetRouter = require("./routes/asset.js");
const performanceMetricRouter = require("./routes/performanceMetrics.js");
const userRouter = require("./routes/user.js");

const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/internProject";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
  .then(() => {
    console.log(
      `Database connection established with internProject at Port No : ${port}`
    );
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// adding cookie to sessions on the web-page
const sessionOptions = {
  secret: "samplesecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // the cookie expires after 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Root Route
app.get("/", (req, res) => {
  res.redirect("/assets");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Asset, Performance-Metrics and User Router
app.use("/assets", assetRouter);
app.use("/performance-metrics", performanceMetricRouter);
app.use("/", userRouter);

// Error Handling middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log(`Server is listening at Port : ${port}`);
});
