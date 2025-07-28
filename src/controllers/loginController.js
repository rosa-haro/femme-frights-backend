const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");
const sendEmail = require("../services/emailServices");
const upload = require("../middlewares/multer");

  // Signup controller
  const signup = async (req, res) => {
    // Handle file upload for profile picture (multer)
    upload.single("profilePicture")(req, res, async function (error) {
      if (error) {
        return res.status(400).json({ status: "Failed", message: error.message });
      }
  
      try {
        // Get user fields from body
        const { name, lastName, username, email, password, role } = req.body;
  
        const serverUrl = process.env.NODE_ENV === 'production' 
          ? "https://femme-frights-demo-production.up.railway.app"
          : "http://localhost:3500";  
  
        // If a profile picture is not uploaded: default
        const profilePicture = req.file
          ? `/uploads/${req.file.filename}` // Save only the relative path
          : `/uploads/default-profile-picture.png`; // Default image path
  
        // Validations: no empty fields
        if (!name || !lastName || !username || !email || !password) {
          return res.status(400).json({
            status: "Failed",
            message: "Name, last name, username, email and password are required",
          });
        }
  
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create user
        const newUser = await UserModel.create({
          name,
          lastName,
          username,
          email,
          password: hashedPassword,
          role,
          profilePicture,
        });
  
        // Send welcome email
        await sendEmail(email);
  
        // Prepend server URL if needed
        const profilePictureUrl = newUser.profilePicture?.startsWith("http")
          ? newUser.profilePicture
          : `${serverUrl}${newUser.profilePicture}`;

          const userToSend = {
            ...newUser._doc,
            profilePicture: profilePictureUrl,
          };

          res.status(201).json({
            status: "Success",
            message: "User successfully created",
            user: userToSend,
          });

      } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
      }
    });
  };

// Login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate: no empty fields
    if (!username || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "Username and password are required.",
      });
    }

    // Check if user exists in the database
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid username or password." });
    }

    // Validate password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid username or password." });
    }

    // Prepare payload (token)
    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    // Generate tokens
    const token = generateToken(payload, false);
    const refresh_token = generateToken(payload, true);

    res.status(200).json({ user, token, refresh_token });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error.message });
  }
};

// THE FOLLOWING ENDPOINT HAS NOT BEEN IMPLEMENTED IN THE FRONTEND,
// BUT IS FUNCTIONAL AND THEREFORE HAS BEEN LEFT HERE FOR FUTURE 
// IMPLEMENTATION

// Refresh token controller
const refreshToken = (req, res) => {
  try {
    const payload = {
      _id: req.payload._id,
      name: req.payload.name,
      role: req.payload.role,
    };
    const token = generateToken(payload, false);
    const refresh_token = generateToken(payload, true);
    res.status(200).send({ token, refresh_token });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = { signup, login, refreshToken };
