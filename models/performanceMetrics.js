const mongoose = require("mongoose");
const { Schema } = mongoose;

const performanceMetricsSchema = new Schema({
  assetID: { type: Schema.Types.ObjectId, ref: "Asset", required: true },
  uptime: { type: Number, required: true },
  downtime: { type: Number, required: true },
  maintenanceCosts: { type: Number, required: true },
  failureRate: { type: Number, required: true, min: 0, max: 1 },
  efficiency: { type: Number, required: true, min: 0, max: 1 },
});

const PerformanceMetrics = mongoose.model(
  "PerformanceMetrics",
  performanceMetricsSchema
);

module.exports = PerformanceMetrics;
