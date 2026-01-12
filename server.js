import express from "express";
import { registerUser } from "./src/utils/register.js";
import { loginUser } from "./src/utils/login.js";

const app = express();

app.use(express.json());

app.post("/auth/register", async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const result = await registerUser(userName, password, email);

    res.json({ message: "User succesfully registered", result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json({ message: "Welcome back", result });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

export default app;
