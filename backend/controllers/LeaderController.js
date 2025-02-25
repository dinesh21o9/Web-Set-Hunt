// const Team = require("../model/TeamModel");
const User = require("../model/UserModel");

module.exports.getWinners = async (req, res, next) => {
  try {
    const teams = await User.find().sort({ score: -1, updatedAt: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
};
