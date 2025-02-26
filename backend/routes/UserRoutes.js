const router = require("express").Router();
const {
  register,
  login,
  check,
  logout,
  profile,
} = require("../controllers/UserController");

router.get("/check", check);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", profile);

module.exports = router;
