// const Quiz = require("../model/QuizModel");
const Question = require("../model/QuestionModel");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Team = require("../model/TeamModel");

module.exports.fetchQuestion = async (req, res, next) => {
  try {
    const set = req.params.set;
    const testStartTime = new Date("2024-03-11T21:40:00");
    const currentTime = new Date();

    if (currentTime < testStartTime) {
      return res.status(403).json({
        message: "Test is not available yet",
        status: false,
      });
    }

    if (!set) {
      return res.status(400).json({ message: "You have not provided set" });
    }

    const token = req.cookies.wshToken;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        status: false,
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.payload;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    const userScore = user.score;

    const question = await Question.findOne({ set: set, queNo: userScore + 1 });
    if (!question) {
      return res.status(404).json({
        message: "Question not found",
        status: false,
      });
    }

    return res.json({
      message: "Question found",
      status: true,
      question,
      userScore,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
        status: false,
      });
    }
    next(error);
  }
};

// API to check user's answer and fetch the next question
module.exports.checkAnswerAndFetchNext = async (req, res, next) => {
  try {
    const set = req.params.set;
    const userAnswer = req.body.answer;

    if (!set || !userAnswer) {
      return res
        .status(400)
        .json({ message: "You have not provided set or answer or queNo" });
    }

    const token = req.cookies.wshToken;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        status: false,
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.payload;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    const userScore = user.score;

    const question = await Question.findOne({ set: set, queNo: userScore + 1 });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const useranswer = userAnswer.toLowerCase();

    const validAnswer = await bcrypt.compare(useranswer, question.queAns);
    if (validAnswer) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { score: 1 } },
        { new: true }
      );

      return res.json({
        message: "Answer is correct",
        status: true,
        // set: set,
      });
    }
    return res.json({
      message: "Your answer is incorrect",
      status: false,
    });
  } catch (error) {
    next(error);
  }
};
