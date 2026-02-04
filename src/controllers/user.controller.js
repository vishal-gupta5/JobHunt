const User = require("../models/User.model");

const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User is already exist with this email.",
        status: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.save({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });
  } catch (err) {}
};




module.exports = {
  register,
};
