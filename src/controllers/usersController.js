const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Get logged user's info, including favorites and watchlist
const getUserById = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const user = await UserModel.findById(idUser)
      .populate("favorites")
      .populate("watchlist");

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

// Update logged user's profile
const updateLoggedUser = async (req, res) => {
  try {
    const idUser = req.payload._id;
    if (!idUser) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid user ID" });
    }

    let newUserData = { ...req.body };

    // Hash password + validate
    if (newUserData.password?.length < 8) {
      return res.status(400).json({
        status: "Failed",
        message: "Password must be at least 8 characters long",
      });
    } else if (newUserData.password) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
    }

    // Handle profile picture update
    if (req.file) {
      console.log("Image received:", req.file);
      newUserData.profilePicture = `http://localhost:3500/uploads/${req.file.filename}`;
    } else {
      console.log("No image received.");
    }

    // Update user in database
    const updatedUser = await UserModel.findByIdAndUpdate(idUser, newUserData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateLoggedUser:", error);
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

// Delete logged user
const deleteLoggedUser = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const user = await UserModel.findByIdAndDelete(idUser);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("Used deleted successfully");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

// Toggle a movie in user's favorites list
const toggleFavorite = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const { idMovie } = req.params;

    if (!idMovie) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Movie ID is required" });
    }

    const user = await UserModel.findById(idUser);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    const movieIndex = user.favorites.indexOf(idMovie);

    // If not in favorites, add it; otherwise, remove it
    if (movieIndex === -1) {
      user.favorites.push(idMovie);
    } else {
      user.favorites.splice(movieIndex, 1);
    }

    await user.save();
    res.status(200).json({ status: "Success", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

// Toggle movie in user's watchlist
const toggleWatchlist = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const { idMovie } = req.params;

    if (!idMovie) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Movie ID is required" });
    }

    const user = await UserModel.findById(idUser);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    const movieIndex = user.watchlist.indexOf(idMovie);

    // If not in watchlist, add it; otherwise, remove it
    if (movieIndex === -1) {
      user.watchlist.push(idMovie);
    } else {
      user.watchlist.splice(movieIndex, 1);
    }

    await user.save();
    res.status(200).json({ status: "Success", watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

module.exports = {
  getUserById,
  updateLoggedUser,
  deleteLoggedUser,
  toggleFavorite,
  toggleWatchlist,
};
