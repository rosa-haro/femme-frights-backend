const express = require("express");
const { getAllUsers, getUserById, updateUserInfo } = require("../controllers/usersController");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/myprofile", verifyToken, getUserById)

router.patch("/myprofile", verifyToken, updateUserInfo)

module.exports = router