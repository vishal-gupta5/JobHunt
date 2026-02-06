const Job = require("../models/Job.model");
const { options } = require("../routes/company.router");

// Job Post
const jobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      positions,
      company,
      experience,
      created_by,
    } = req.body;

    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !positions ||
      !company ||
      !experience ||
      !created_by
    ) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(", "),
      salary: Number(salary),
      location,
      jobType,
      positions,
      company: CompanyId,
      experience,
      created_by: userId,
    });

    return res.status(200).json({
      message: "New Job Created Successfully!",
      job,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// Get all jobs
const getAllGobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, options: "i" } },
        { description: { $regex: keyword, options: "i" } },
      ],
    };

    const jobs = await Job.find(query);
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All jobs are given below: ",
      jobs,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
    });
  }
};

// Get job by Id
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.find(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    return res.status(200).json({
      message: `Error: ${err.message}`,
    });
  }
};

// Jobs created by Admin
const getAdminJobs = async (req, res) => {
  try {
    const AdminId = req.id;
    const jobs = await Job.find({ created_by: AdminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All jobs are given as: ",
      jobs,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
    });
  }
};

module.exports = {
  jobPost,
  getAllGobs,
  getJobById,
};
