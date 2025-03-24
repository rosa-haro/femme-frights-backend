const express = require('express');
const { signup, login, refreshToken } = require('../controllers/loginController')
const { verifyToken } = require("../middlewares/auth")
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

// THE FOLLOWING ENDPOINT HAS NOT BEEN IMPLEMENTED IN THE FRONTEND,
// BUT IS FUNCTIONAL AND THEREFORE HAS BEEN LEFT HERE FOR FUTURE 
// IMPLEMENTATION
router.get('/refresh-token', verifyToken, refreshToken)

module.exports = router