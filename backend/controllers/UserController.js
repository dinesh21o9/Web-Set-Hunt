const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registeration
module.exports.register = async (req, res, next) => {
  try {
    const { teamLeaderName, teamName, email, password, rollNo, mobileNo } =
      req.body;

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(200).json({
        msg: "Email Already used",
        status: false,
      });
    }

    // const teamCode = randomstring.generate({
    //   length: 6,
    //   charset: "alphanumeric",
    //   capitalization: "uppercase",
    // });

    const user = await User.create({
      teamLeaderName,
      teamName,
      email,
      password,
      rollNo,
      mobileNo,
      // teamCode,
      score: 0,
    });

    let uid = user["_id"];
    let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);

    res.cookie("wshToken", token, {
      httpOnly: true, // Prevents access via JavaScript (XSS protection).
      // ⬆️ Should ALWAYS be true for security.

      secure: process.env.NODE_ENV === "production",
      // Ensures the cookie is sent only over HTTPS.
      // ⬆️ Should be false in development (localhost) and true in production.

      sameSite: "lax", // Helps protect against CSRF attacks.
      // ⬆️ "Lax" is a good default for authentication cookies.
      // ⬆️ Use "Strict" for stronger security but may affect UX.
      // ⬆️ Use "None" only if you need cross-site access (requires `secure: true`).

      path: "/", // Makes the cookie available across the entire domain.
      // ⬆️ Typically "/", unless restricting to specific paths.

      maxAge: 2 * 3600000, // Specifies cookie expiration time (2 hours).
      // ⬆️ Adjust based on session requirements.
    });

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
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(404).json({
        msg: "User Not Found",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "Incorrect Password",
        status: false,
      });
    }

    let uid = userData["_id"];
    let token = jwt.sign({ payload: uid }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });

    // console.log("NODE_ENV : " + process.env.NODE_ENV);

    // Set cookies securely
    res.cookie("wshToken", token, {
      httpOnly: true, // Prevents access via JavaScript (XSS protection).
      // ⬆️ Should ALWAYS be true for security.

      secure: process.env.NODE_ENV === "production",
      // Ensures the cookie is sent only over HTTPS.
      // ⬆️ Should be false in development (localhost) and true in production.

      sameSite: "lax", // Helps protect against CSRF attacks.
      // ⬆️ "Lax" is a good default for authentication cookies.
      // ⬆️ Use "Strict" for stronger security but may affect UX.
      // ⬆️ Use "None" only if you need cross-site access (requires `secure: true`).

      path: "/", // Makes the cookie available across the entire domain.
      // ⬆️ Typically "/", unless restricting to specific paths.

      maxAge: 2 * 3600000, // Specifies cookie expiration time (2 hours).
      // ⬆️ Adjust based on session requirements.
    });

    // const team = await Team.findOne({ members: userData._id });

    return res.status(200).json({
      msg: "User logged in successfully",
      userDetails: userData,
      status: true,
      token, // Remove later
    });
  } catch (error) {
    next(error);
  }
};

module.exports.check = async (req, res, next) => {
  try {
    const token = req.cookies.wshToken;

    if (!token) {
      return res.json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.JWT_KEY);
    return res.json({ isAuthenticated: true });
  } catch (error) {
    return res.json({ isAuthenticated: false, error: error.message });
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("wshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
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
    const token = req.cookies.wshToken;

    if (!token) {
      return res.json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (error) {
    // console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// module.exports.checkTeam = async (req, res, next) => {};
