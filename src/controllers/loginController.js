const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");
const sendEmail = require("../services/emailServices")
const upload = require("../middlewares/multerConfig");

const signup = async (req, res) => {
    upload.single("profilePicture")(req, res, async function (error) {
        if (error) {
            return res.status(400).json({ status: "Failed", message: error.message });
        }

        try {
            const { name, lastName, username, email, password, role } = req.body;
            const serverUrl = "http://localhost:3500"; 
            const profilePicture = req.file ? `${serverUrl}/uploads/${req.file.filename}` : `${serverUrl}/uploads/default-profile.jpg`;
            if (!name || !lastName || !username || !email || !password) {
                return res.status(400).json({ status: "Failed", message: "Name, last name, username, email and password are required" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await UserModel.create({
                name,
                lastName,
                username,
                email,
                password: hashedPassword,
                role,
                profilePicture,
            });

            await sendEmail(email);

            res.status(201).json({ status: "Success", message: "User successfully created", user: newUser });
        } catch (error) {
            res.status(500).json({ status: "Failed", message: error.message });
        }
    });
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: "Failed", message: "Username and password are required." });
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ status: "Failed", message: "Invalid username or password." });
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(401).json({ status: "Failed", message: "Invalid username or password." });
        }
    
        const payload = {
            _id: user._id,
            name: user.name,
            role: user.role,
        };

        const token = generateToken(payload, false);
        const refresh_token = generateToken(payload, true);

        res.status(200).json({ user, token, refresh_token });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
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
