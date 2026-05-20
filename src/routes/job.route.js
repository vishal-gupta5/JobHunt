const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  jobPost,
  getAllGobs,
  getJobById,
  getAdminJobs,
} = require("../controllers/job.controller");
const jobRouter = express.Router();

jobRouter.route("/post").post(isAuthenticated, jobPost);
jobRouter.route("/get").get(isAuthenticated, getAllGobs);
jobRouter.route("/get/:id").get(isAuthenticated, getJobById);
jobRouter.route("/getAdminJobs").get(isAuthenticated, getAdminJobs);

module.exports = jobRouter;
