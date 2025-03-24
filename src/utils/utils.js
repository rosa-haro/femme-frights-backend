const jwt = require("jsonwebtoken");

// Function to generate JWT token
const generateToken = (payload, isRefreshToken) => {
    if (isRefreshToken) {
        return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {
            expiresIn: "130min",
        })
    }

    // DURATION WILL BE SHORTENED AFTER REFRESH TOKEN IS IMPLEMENTED
    return jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: "120min",
    })
}

module.exports = { generateToken }