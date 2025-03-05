const router = require("express").Router();
const clientLimiter = require("../middlewares/clientLimiter");
const {
  register,
  login,
  check,
  logout,
  profile,
} = require("../controllers/UserController");

router.get("/check", clientLimiter, check);
router.post("/register", clientLimiter, register);
router.post("/login", clientLimiter, login);
router.post("/logout", clientLimiter, logout);
router.get("/profile", clientLimiter, profile);

module.exports = router;
