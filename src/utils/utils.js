const jwt = require("jsonwebtoken");

const generateToken = (payload, isRefreshToken) => {
    if (isRefreshToken) {
        return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {
            expiresIn: "60min",
        })
    }

    return jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: "15min",
    })
}

module.exports = { generateToken }