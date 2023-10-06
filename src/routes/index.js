const { Router } = require("express");

const router = Router();

router.use("/api/v1/auth", require("./Auth"));
router.use("/api/v1/student", require("./Student"));
router.use("/api/v1/classe", require("./Classe"));

module.exports = router;
