const express = require("express");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").patch(isAuthenticated, updateProfile);

module.exports = router;
