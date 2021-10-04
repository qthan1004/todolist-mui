const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const authController = require("../controllers/auth.controller");

router.get("/", verifyToken, authController.isLogin);
router.post("/register", authController.createUser);
router.post("/login", authController.login);

module.exports = router;
