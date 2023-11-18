require("dotenv").config();
const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token || !token.startsWith("Bearer "))
      throw "errorMessage_token_missing";

    const decoded = JWT.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_TOKEN
    );
    if (!decoded) throw "errorMessage_token_missing";

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

module.exports = { authMiddleware };
