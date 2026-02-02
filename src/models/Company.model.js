const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    validate: {
      validator: (value) =>
        typeof value === "string" && value.trim().length > 0,
      message: "Please Enter the valid String",
    },
  },
  description: {
    type: String,
    trim: true,
    validate: {
      validator: (value) =>
        typeof value === "string" && value.trim().length > 0,
      message: "Please Enter the valid String",
    },
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: (value) =>
        typeof value === "string" && value.trim().length > 0,
      message: "Please Enter the valid String",
    },
  },
  location: {
    type: String,
    trim: true,
    validate: {
      validator: (value) =>
        typeof value === "string" && value.trim().length > 0,
      message: "Please Enter the valid String",
    },
  },
  logo: {
    type: String,
    trim: true,
    validate: {
      validator: (value) =>
        typeof value === "string" && value.trim().length > 0,
      message: "Please Enter the valid URL",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
