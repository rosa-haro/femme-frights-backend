const express = require('express');
const { signup, login, refreshToken } = require('../controllers/loginController')
const { verifyToken } = require("../middlewares/auth")
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

// Sólo este endpoint usa el token de refresco
router.get('/refresh-token', verifyToken, refreshToken)

module.exports = router