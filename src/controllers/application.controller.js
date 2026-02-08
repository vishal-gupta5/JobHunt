const Application = require("../models/Application.model");
const Job = require("../models/Job.model");
const { options } = require("../routes/job.router");

// Apply Job
const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(404).jons({
        message: "JobId is required!",
        suceess: false,
      });
    }

    const existingApplication = await Appliation.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job!",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicat: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job Applied Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
    });
  }
};

// get Applied jobs -> For Applicants
const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicat: userId })
      .sort({ created_by: -1 })
      .populate({
        path: "job",
        options: { sort: { created_by: -1 } },
        populate: {
          path: "company",
          options: { sort: { created_by: -1 } },
        },
      });

    if (!applications) {
      return res.status(200).json({
        message: "No applications found!",
        success: false,
      });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// getApplications -> For Admin

const getApplicants = async (req, res) => {
    try {
        
    } catch (err) {
        return res.status(400).json({
            message: `Error: ${err.message}`,
            success: false,
        })
    }
}


module.exports = {
  applyJob,
  getAppliedJobs,
  getApplicants
};
