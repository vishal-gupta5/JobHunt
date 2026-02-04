const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res.status(400).json({
        message: "User is not authenticated!",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(400).json({
        message: "Token is not valid!",
      });
    }

    req.id = decode.userId;
    next();
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`,
    });
  }
};

module.exports = isAuthenticated;
