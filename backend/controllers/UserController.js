const User = require("../model/UserModel");
const Team = require("../model/TeamModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registeration
module.exports.register = async (req, res, next) => {
  try {
    const { email, password, username, rollNo, mobileNo } =
      req.body;

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(200).json({
        msg: "Email Already used",
        status: false,
      });
    }

    const user = await User.create({
      email,
      password,
      username,
      rollNo,
      mobileNo,
    });

    const random = await user.save();
    let uid = user["_id"];
    let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);
    res.cookie("login", token);
    return res.status(201).json({
      msg: "User registered successfully",
      status: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({
        msg: "User Not found",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (isPasswordValid) {
      let uid = userData["_id"];
      let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);
      res.cookie("login", token);
      res.cookie("userid", uid, { httpOnly: true });

      const team = await Team.findOne({ members: userData._id });
      if (!team) {
        return res.json({
          msg: "User has logged in but is not a member of any team",
          status: true,
          team: false,
          userDetails: userData,
          token,
        });
      }

      return res.json({
        msg: "User logged in and joined a team",
        userDetails: userData,
        status: true,
        team: team,
        token,
      });
    } else {
      return res.json({
        msg: "Incorrect Password",
        status: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

//update details

// module.exports.updateDetails = async (req, res, next) => {
//   try {
//     const { username, rollNo, mobileNo, email, password } = req.body;
//     if (!email) {
//       return res.json({
//         msg: "User is not found",
//         status: false,
//       });
//     }

//     const updatedUser = await User.findOneAndUpdate(
//       { email: email },
//       {
//         username: username,
//         rollNo: rollNo,
//         mobileNo: mobileNo,
//         password: password,
//       },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.json({
//       msg: "User info updated successfully",
//       updatedUser,
//       status: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.protectRoute = async (req, res, next) => {
  try {
    console.log(req.headers);

    if (
      !req.headers.authorization
      //   !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res
        .status(401)
        .json({ message: "Operation not allowed, token missing" });
    }

    const token = req.headers.authorization;
    console.log(token);
    // const token = req.headers.authorization.split(" ")[1];

    const isVerifiedUser = jwt.verify(token, process.env.JWT_KEY);

    if (!isVerifiedUser) {
      return res.status(401).json({ message: "User is not verified" });
    }

    // req.user = isVerifiedUser;

    next();
  } catch (error) {
    // console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// module.exports.checkTeam = async (req, res, next) => {};
