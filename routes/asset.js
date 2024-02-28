const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { assetSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Asset = require("../models/assets.js");
const PerformanceMetrics = require("../models/performanceMetrics.js");
const { isLoggedIn } = require("../middlewares.js");

const validateAsset = (req, res, next) => {
  let result = assetSchema.validate(req.body);
  if (result.error) {
    const errorMsg = result.error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};

// Assets Route
// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let assets = await Asset.find();
    res.render("assets/index.ejs", { assets });
  })
);

// New Route
router.get("/create", isLoggedIn, (req, res) => {
  res.render("assets/new.ejs");
});

// Create Route
router.post(
  "/",
  validateAsset,
  wrapAsync(async (req, res, next) => {
    let { name, type, location, purchaseDate, initialCost, operationalStatus } =
      req.body;
    let newAsset = new Asset({
      name: name,
      type: type,
      location: location,
      purchaseDate: purchaseDate,
      initialCost: initialCost,
      operationalStatus: operationalStatus,
    });

    await newAsset.save();
    req.flash("success", "New Asset Created!");
    res.redirect("/assets");
  })
);

// Show Route
router.get(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let asset = await Asset.findById(id);
    let performanceExists = await PerformanceMetrics.exists({
      assetID: id,
    });

    let { username } = req.user;
    if (!asset) {
      req.flash("error", "Asset you trying to access doesnot exists");
      res.redirect("/assets");
    }
    // console.log({ ...performanceExists });
    res.render("assets/show.ejs", { asset, performanceExists, username });
  })
);

// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let asset = await Asset.findById(id);
    if (!asset) {
      req.flash("error", "Asset you trying to access doesnot exists");
      res.redirect("/assets");
    }
    res.render("assets/edit.ejs", { asset });
  })
);

// Update Route
router.put(
  "/:id",
  validateAsset,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updatedAsset = await Asset.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    req.flash("success", "Asset is Updated!");
    res.redirect(`/assets/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedAsset = await Asset.findByIdAndDelete(id);
    req.flash("success", "Asset is Deleted!");
    res.redirect("/assets");
  })
);

module.exports = router;
