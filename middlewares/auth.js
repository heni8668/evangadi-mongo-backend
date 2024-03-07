const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ msg: "Authentication failed, No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { username, _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username: username, _id };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Authentication failed" });
  }
};

module.exports = authMiddleware;
