const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
      req.payload = payload;
      next();
    } catch (error) {
      res.status(400).send("Expired or invalid token");
    }
  }
};

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
