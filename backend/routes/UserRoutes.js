const router = require("express").Router();
const {
  register,
  login,
  check,
  logout,
} = require("../controllers/UserController");

router.get("/check", check);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
