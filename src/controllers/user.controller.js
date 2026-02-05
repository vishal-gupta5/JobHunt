const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
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
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });

    return res.status(200).json({
      message: "Account Created Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email Address!",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Password!",
        success: false,
      });
    }

    // Check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with this role!",
        success: false,
      });
    }

    // Generate the token
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        minAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    return res.status(200).cookie(token, null, { expiresIn: 0 }).json({
      message: "User Logout Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
      success: false,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, skills, bio } = req.body;
    const file = req.file;
    // Coundinary aayega idhar

    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not fount!",
        success: false,
      });
    }

    // Update basic fields safely
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update skills safely
    if (skills) {
      user.skills = skills.split(",").map((s) => s.trim());
    }

    // Update profile fields safely
    if (bio) {
      user.profile.bio = bio;
    }

    // We will create the field for resume

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully!",
      user,
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
  register,
  login,
  logout,
  updateProfile,
};
