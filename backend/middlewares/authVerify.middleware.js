const jwt = require("jsonwebtoken");
const JWT_SECRET  = process.env.JWT_SECRET;

const authVerify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Please add Authorization header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const verifiedUser = jwt.verify(token, JWT_SECRET);
    if (verifiedUser.userId) {
      req.userId = verifiedUser.userId;
      next();
    }
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { authVerify };
