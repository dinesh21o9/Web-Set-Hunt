const Quiz = require("../model/QuizModel");
const Question = require("../model/QuestionModel");
const Users = require("../model/UserModel");
const bcrypt = require("bcrypt");
const Team = require("../model/TeamModel");

  module.exports.fetchQuestion = async (req, res, next) => {
    try {
      const set = req.params.set;

      const testStartTime = new Date("2024-03-11T21:40:00");df
      const currentTime = new Date();
      // console.log(currentTime + " " + testStartTime);
      if (currentTime < testStartTime) {
        return res.status(403).json({
          message: "Test is not available yet",
          status: false,
        });
      }

      if (!set) {
        return res.status(400).json({ message: "You have not provided set" });
      }

      const teamid = req.headers.teamid;
      const userid = req.headers.userid;
      
      const documents = await Quiz.findOne({ team: teamid });
      if (!documents) {
        const updatedAnswer = await Quiz.create({
          team: teamid,
          user: userid,
          answer: "initial",
          score: 0
        });
        if (!updatedAnswer) {
          console.log("User data not updated");
        }
      }

      let maxScore = documents ? documents.score : 0;

      const question = await Question.findOne({ set: set, queNo: maxScore + 1 });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      return res.json({
        message: "Question found",
        status: true,
        question,
      });
    } catch (error) {
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
    
    const teamid = req.headers.teamid;
    const userid = req.headers.userid;

    const documents = await Quiz.findOne({ team: teamid });

    if (!documents) {
      return res.status(404).json({ message: "Fetch Question First" });
    }

    let maxScore = documents.score;

    console.log(maxScore);

    const question = await Question.findOne({ set: set, queNo: maxScore + 1 });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    console.log(userAnswer);
    const useranswer = userAnswer.toLowerCase();

    const validAnswer = await bcrypt.compare(useranswer, question.queAns);
    console.log(validAnswer);
    if (validAnswer) {
      const updateTeamData = await Team.findOneAndUpdate(
        { _id: teamid },
        { score: maxScore + 1 }
      );

      const checkuser = await Quiz.findOne({ user: userid });
      if (!checkuser) {
        const userres = new Quiz({
          team: teamid,
          answer: useranswer,
          user: userid,
          score: maxScore + 1,
        });
        userres.save();
      }
      
      const updateUserData = await Quiz.findOneAndUpdate(
        { user: userid },
        { score: maxScore + 1 }
      );

      return res.json({
        message: "Answer is correct",
        status: true,
        set: set,
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
