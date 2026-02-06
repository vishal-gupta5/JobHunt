const Company = require("../models/Company.model");

// Register Company
const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company is required!",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register in same company!",
        success: false,
      });
    }

    const newCompany = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(200).json({
      message: "Company register successfully!",
      company: newCompany,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// Get all companies
const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });

    if (!companies || companies.length == 0) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Get all companies",
      companies,
      success: true,
    });
  } catch {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// Get Company by Id
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Finally You got company!",
      company,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// Update the company
const updateCompnay = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // cloudinary file

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Information Updated!",
      company,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompnay,
};
