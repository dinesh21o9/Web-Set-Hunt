const router = require('express').Router();
const {register,login,updateDetails,protectRoute} = require('../controllers/UserController')

router.post("/register",register);
router.post("/login",login);
router.put("/profile", protectRoute, updateDetails)

module.exports = router;