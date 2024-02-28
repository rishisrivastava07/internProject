const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PerformanceMetrics = require("./performanceMetrics.js");

// Asset Schema
const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  initialCost: { type: Number, required: true },
  operationalStatus: { type: String, required: true },
});

// POST middleware to handle deleted data of asset
assetSchema.post("findOneAndDelete", async (asset) => {
  await PerformanceMetrics.deleteMany({ assetID: asset._id });
  // console.log(`Deleted PerformanceMetrics for Asset: ${asset._id}`);
});

// Define Asset model
module.exports = mongoose.model("Asset", assetSchema);
