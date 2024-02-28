// const Joi = require("joi").extend(require("joi-objectid"));
const Joi = require("joi");

module.exports.assetSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  location: Joi.string().required(),
  purchaseDate: Joi.date().required(),
  initialCost: Joi.number().required().min(0),
  operationalStatus: Joi.string().required(),
});

const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

module.exports.performanceMetricsSchema = Joi.object({
  assetID: objectIdSchema.required(),
  uptime: Joi.number().required(),
  downtime: Joi.number().required(),
  maintenanceCosts: Joi.number().required(),
  failureRate: Joi.number().required().min(0).max(1),
  efficiency: Joi.number().required().min(0).max(1),
});
