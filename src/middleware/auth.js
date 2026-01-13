import { verifyToken } from "../utils/jwt.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Bad request" });
    }

    const payload = await verifyToken(token);
    req.user = payload;

    next();
  } catch (e) {
    return res.status(403).json({ error: "Forbidden" });
  }
};
