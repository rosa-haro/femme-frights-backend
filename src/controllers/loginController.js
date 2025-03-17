const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");
const sendEmail = require("../services/emailServices")

const signup = async (req, res) => {
    try {
        const { name, lastName, username, email, password, role, profilePicture } = req.body;
        
        const userProfilePicture = profilePicture
        
        const newUser = {
          name,
          lastName,
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role,
          userProfilePicture,
        };
        await UserModel.create(newUser);
        await sendEmail(email)

        res.status(201).json({ status: "Success", message: "The user was successfully created" });
    } catch (error) {
        res.status(500).json({ status: "Failed", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).send("Invalid username or password");
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(404).send("Invalid username or password");
        }
    
        const payload = {
            _id: user._id,
            name: user.name,
            role: user.role,
        };

        const token = generateToken(payload, false);
        const refresh_token = generateToken(payload, true);

        res.status(200).send({ user, token, refresh_token });
    } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message });
    }
};

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
