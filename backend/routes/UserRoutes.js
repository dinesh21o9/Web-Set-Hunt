const router = require("express").Router();
const { register, login, check } = require("../controllers/UserController");

router.get("/check", check);
router.post("/register", register);
router.post("/login", login);

router.post("/logout", (req, res) => {
  res.clearCookie("login");
  res.clearCookie("userid");
  res.json({ msg: "Logged out successfully", status: true });
});

// router.put("/profile", protectRoute, updateDetails)

module.exports = router;
