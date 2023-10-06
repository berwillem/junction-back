const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authval");

// user auth routes :

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", verifyToken, authController.logout);

module.exports = router;
