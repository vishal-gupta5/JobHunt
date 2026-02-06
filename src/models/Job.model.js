const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requied: true,
      trim: true,
      validate: {
        validator: (value) =>
          typeof value === "string" && value.trim().length > 0,
        message: "Invalid Input String",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
      validate: {
        validator: (value) =>
          typeof value === "string" && value.trim().length > 0,
        message: "Invalid Input String",
      },
    },
    requirements: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) =>
          typeof value === "string" && value.trim().length > 0,
        message: "Invalid Input String",
      },
    },
    experience: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      require: true,
      validate: {
        validator: (value) => Number.isFinite(value),
        message: (props) => `${props.value} is not a valid number`,
      },
    },
    location: {
      type: String,
      require: true,
      validate: {
        validator: (value) =>
          typeof value === "string" && value.trim().length > 0,
        message: "Invalid Input String",
      },
    },
    jobType: {
      type: String,
      require: true,
      validate: {
        validator: (value) =>
          typeof value === "string" && value.trim().length > 0,
        message: "Invalid Input String",
      },
    },
    positions: {
      type: Number,
      requied: true,
      validate: {
        validator: (value) => Number.isFinite(value),
        message: (props) => `${props.value} is not a valid number`,
      },
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
