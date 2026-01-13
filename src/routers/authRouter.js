import { Router } from "express";
import { registerUser } from "../utils/register.js";
import { loginUser } from "../utils/login.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const result = await registerUser(userName, password, email);

    res.json({ message: "User succesfully registered", result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json({ message: "Welcome back", result });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

export default router;
