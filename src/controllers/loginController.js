const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    try {
        const { name, lastName, username, email, password, role } = req.body;
        const newUser = {
          name,
          lastName,
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role,
        };
        await UserModel.create(newUser);

        res.status(201).json({ status: "Success", message: "The user was successfully created" });
    } catch (error) {
        res.status(500).json({ status: "Failed", error: error.message });
    }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(404).send("Usuario o contraseña no válidos");
      }
  
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        return res.status(404).send("Usuario o contraseña no válidos");
      }
  
      // npm i jsonwebtoken
  
      const payload = {
        _id: user._id,
        name: user.name,
        role: user.role,
      };
  
      const token = generateToken(payload, false);
      const token_refresh = generateToken(payload, true);
  
      res.status(200).send({ user, token, token_refresh });
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
      const token_refresh = generateToken(payload, true);
      res.status(200).send({ token, token_refresh });
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
  };

module.exports = { signup, login, refreshToken }