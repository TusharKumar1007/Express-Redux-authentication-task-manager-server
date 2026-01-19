import { verifyToken } from "../utils/jwt.js";

export const authenticateToken = async (req, res, next) => {
  try {
    // const authHeader = req.headers["authorization"];

    // const token = authHeader && authHeader.split(" ")[1];

    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ error: "Bad request" });
    }

    const payload = await verifyToken(token);
    
    req.user = payload;

    next();
  } catch (e) {
    console.error(e.message);
    return res.status(403).json({ error: e.message });
  }
};
