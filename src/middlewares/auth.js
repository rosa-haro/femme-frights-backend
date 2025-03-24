const jwt = require("jsonwebtoken");

// Middleware to verify access or refresh token
const verifyToken = async (req, res, next) => {
  // Read token from header
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    // Try to verify access token
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    // If it fails, try to verify as a refresh token
    try {
      const payload = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
      req.payload = payload;
      next();
    } catch (error) {
      // If both fail, deny acccess
      res.status(400).send("Expired or invalid token");
    }
  }
};

// THE FOLLOWING ENDPOINT HAS NOT BEEN IMPLEMENTED IN THE FRONTEND,
// BUT IS FUNCTIONAL AND THEREFORE HAS BEEN LEFT HERE FOR FUTURE 
// IMPLEMENTATION

// Middleware to check if user's role is admin
const verifyAdmin = async (req, res, next) => {
  try {
    const payload = req.payload;
    if (payload.role === "user")
      return res.status(401).send("You do not have permission");
    next();
  } catch (error) {
    res.status(400).send("Expired or invalid token");
  }
};

module.exports = { verifyToken, verifyAdmin };
