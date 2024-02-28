const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { performanceMetricsSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Asset = require("../models/assets.js");
const PerformanceMetrics = require("../models/performanceMetrics.js");
const { isLoggedIn } = require("../middlewares.js");

const validatePerformanceMetrics = async (req, res, next) => {
  let result = performanceMetricsSchema.validate(req.body);
  if (result.error) {
    const errorMsg = result.error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};

// Performance Routes
// Index route
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let performances = await PerformanceMetrics.find().populate("assetID");
    res.render("performances/index.ejs", { performances });
  })
);

// Create route
router.get(
  "/:id/create",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let asset = await Asset.findById(id);
    res.render("performances/new.ejs", { asset });
  })
);

router.post(
  "/:id",
  validatePerformanceMetrics,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const asset = await Asset.findById(id);

    const { uptime, downtime, maintenanceCosts, failureRate, efficiency } =
      req.body;

    const newPerformanceMetrics = new PerformanceMetrics({
      assetID: asset._id,
      uptime: parseFloat(uptime),
      downtime: parseFloat(downtime),
      maintenanceCosts: parseFloat(maintenanceCosts),
      failureRate: parseFloat(failureRate),
      efficiency: parseFloat(efficiency),
    });

    await newPerformanceMetrics.save();
    req.flash("success", "Performance Metrics is Created!");
    res.redirect(`/performance-metrics/${newPerformanceMetrics._id}`);
  })
);

// Show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let performance = await PerformanceMetrics.findById(id).populate("assetID");
    res.render("performances/show.ejs", { performance });
  })
);

router.get(
  "/:id/show",
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let performanceMetric = await PerformanceMetrics.findOne({
      assetID: id,
    }).populate("assetID");
    res.redirect(`/performance-metrics/${performanceMetric._id}`);
  })
);

// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let performance = await PerformanceMetrics.findById(id).populate("assetID");
    res.render("performances/edit.ejs", { performance });
  })
);

// Update Route
router.patch(
  "/:id",
  validatePerformanceMetrics,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updatedPerformances = await PerformanceMetrics.findByIdAndUpdate(
      id,
      { ...req.body }, // deconstructing the JS Object
      { runValidators: true, new: true }
    ).populate("assetID");
    req.flash("success", "Performance Metrics is Updated!");
    res.redirect(`/performance-metrics/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedMetric = await PerformanceMetrics.findByIdAndDelete(id);
    req.flash("success", "Performance Metrics is Deleted!");
    res.redirect(`/assets/${deletedMetric.assetID}`);
  })
);

module.exports = router;
