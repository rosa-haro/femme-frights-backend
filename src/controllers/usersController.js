const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Este endpoint no lo voy a utilizar, es sólo para mí para probar

const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
  };

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

  // Update user's own profile
  const updateLoggedUser = async (req, res) => {
    try {
        const idUser = req.payload._id; 

        if (!idUser) {
            return res.status(400).json({ status: "Failed", message: "Invalid user ID" });
        }

        let newUserData = { ...req.body };

        // ID and role cannot be changed
        delete newUserData.role;
        delete newUserData._id;

        // Check if password is being updated
        if (newUserData.password) {
            if (newUserData.password.length < 8) {
                return res.status(400).json({ status: "Failed", message: "Password must be at least 8 characters long" });
            }
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(idUser, newUserData, {
            new: true,
            runValidators: true, // Applies mongoose validators
        });

        if (!updatedUser) {
            return res.status(404).json({ status: "Failed", message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ status: "Failed", error: error.message });
    }
};

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

    const toggleFavorite = async (req, res) => {
        try {
            const idUser = req.payload._id;
            const { idMovie } = req.params;
    
            if (!idMovie) {
                return res.status(400).json({ status: "Failed", message: "Movie ID is required" });
            }
    
            const user = await UserModel.findById(idUser);
            if (!user) {
                return res.status(404).json({ status: "Failed", message: "User not found" });
            }
    
            const movieIndex = user.favorites.indexOf(idMovie);
    
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

    const toggleWatchlist = async (req, res) => {
        try {
            const idUser = req.payload._id;
            const { idMovie } = req.params;
    
            if (!idMovie) {
                return res.status(400).json({ status: "Failed", message: "Movie ID is required" });
            }
    
            const user = await UserModel.findById(idUser);
            if (!user) {
                return res.status(404).json({ status: "Failed", message: "User not found" });
            }
    
            const movieIndex = user.watchlist.indexOf(idMovie);
    
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
    getAllUsers, getUserById, updateLoggedUser, deleteLoggedUser, toggleFavorite, toggleWatchlist
  }