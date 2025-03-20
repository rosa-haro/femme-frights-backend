const express = require("express");
const { getAllUsers, getUserById, updateLoggedUser, deleteLoggedUser, toggleFavorite, toggleWatchlist } = require("../controllers/usersController");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();
const upload = require("../middlewares/multer")

router.get("/", getAllUsers);
router.get("/myprofile", verifyToken, getUserById)

router.patch("/myprofile", verifyToken, upload.single("profilePicture"), updateLoggedUser)
router.patch("/favorites/:idMovie", verifyToken, toggleFavorite)
router.patch("/watchlist/:idMovie", verifyToken, toggleWatchlist)

router.delete("/myprofile", verifyToken, deleteLoggedUser)

module.exports = router