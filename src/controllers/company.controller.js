const Company = require("../models/Company.model");

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company is required!",
        success: false,
      });
    }

    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register in same company!",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req._id,
    });

    return res.status(200).json({
      message: "Company register successfully!",
      company,
      success: true,
    });
  } catch (err) {
    return res.stutus(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

module.exports = {
  registerCompany,
};
