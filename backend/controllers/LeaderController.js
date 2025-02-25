const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

module.exports.getWinners = async (req, res, next) => {
  try {
    const teams = await User.find().sort({ score: -1, updatedAt: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

module.exports.getCurrent = async (req, res, next) => {
  try {
    const token = req.cookies.wshToken;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        status: false,
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.payload;

    res.json(userId);
  } catch (error) {
    next(error);
  }
};
