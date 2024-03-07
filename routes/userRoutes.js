const express = require("express");
const { addUser, loginUser, check } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

//register routes
router.post("/register", addUser);
router.post("/login", loginUser);
router.get("/check", authMiddleware, check);
module.exports = router;
