const express = require("express");
const { getAllUsers, getUserById, updateLoggedUser, deleteLoggedUser } = require("../controllers/usersController");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/myprofile", verifyToken, getUserById)

router.patch("/myprofile", verifyToken, updateLoggedUser)

router.delete("/myprofile", verifyToken, deleteLoggedUser)

module.exports = router