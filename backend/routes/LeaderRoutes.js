const router = require("express").Router();
const { getWinners, getCurrent } = require("../controllers/LeaderController");
const { protectRoute } = require("../controllers/UserController");

router.use(protectRoute);
router.get("/winners", getWinners);
router.get("/current", getCurrent);

module.exports = router;
