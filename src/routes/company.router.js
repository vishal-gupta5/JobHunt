const express = require("express");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompnay,
} = require("../controllers/company.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const companyRouter = express.Router();

companyRouter.route("/register").post(isAuthenticated, registerCompany);
companyRouter.route("/get").get(isAuthenticated, getCompany);
companyRouter.route("/get/:id").get(isAuthenticated, getCompanyById);
companyRouter.route("/update/:id").patch(isAuthenticated, updateCompnay);

module.exports = companyRouter;
