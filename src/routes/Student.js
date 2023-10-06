const express = require("express");
const router = express.Router({ mergeParams: true });
const studentController = require("../controllers/studentController");
const { verifyToken } = require("../middlewares/authval");

// user auth routes :

router.get("/", studentController.getAllStudents);
router.post("/signup", studentController.signup);
router.post("/login", studentController.login);
router.post("/logout", verifyToken, studentController.logout);

module.exports = router;
