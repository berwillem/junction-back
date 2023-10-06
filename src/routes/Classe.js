const express = require("express");
const router = express.Router({ mergeParams: true });
const classeController = require("../controllers/classeController");
// const { verifyToken } = require("../middlewares/authval");

// user auth routes :

router.get("/", classeController.getAllClasses);
router.post("/", classeController.createClasse);

module.exports = router;
