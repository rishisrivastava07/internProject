const mongoose = require("mongoose");
const PerformanceMetrics = require("../models/performanceMetrics.js");
const Asset = require("../models/assets.js");

main()
  .then(() => {
    console.log("Database connection done successfully");
    return clearAndInitData();
  })
  .then(() => {
    console.log("Data initialized successfully");
  })
  .catch((err) => console.log(err))
  .finally(() => {
    mongoose.disconnect();
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/internProject");
}

async function clearAndInitData() {
  // Clear existing data
  await PerformanceMetrics.deleteMany({});
  console.log("Existing data cleared successfully");

  let sampleAssets = await Asset.find();
  // console.log(sampleAssets);

  let allPerformanceMetrics = [];
  let defMetrics = {
    uptime: 95,
    downtime: 8,
    maintenanceCosts: 120,
    failureRate: 0.1,
    efficiency: 0.99,
  };

  for (sampleAsset of sampleAssets) {
    const performanceMetric = {
      assetID: sampleAsset._id,
      ...defMetrics,
    };
    allPerformanceMetrics.push(performanceMetric);
  }
  // console.log(allPerformanceMetrics);
  await PerformanceMetrics.insertMany(allPerformanceMetrics);

  // console.log(allPerformanceMetrics.assetID._id);
}
