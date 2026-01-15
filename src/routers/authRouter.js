import { Router } from "express";
import { registerUser } from "../utils/register.js";
import { loginUser } from "../utils/login.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const { user, token } = await registerUser(userName, password, email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2000 * 60 * 60 * 24,
    });

    res.json({ message: "User succesfully registered", user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2000 * 60 * 60 * 24,
    });

    
    res.json({ message: "Welcome back", user });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ error: "Logout failed" });
  }
});


export default router;
