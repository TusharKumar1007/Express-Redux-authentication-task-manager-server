import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { deleteAccount } from "../utils/deleteAccount.js";
const router = Router();

router.use(authenticateToken);

router.delete("/delete", async (req, res) => {
  try {
    const { id: userId } = req.user;
    await deleteAccount(userId);
    res.status(201).json({ message: "user deleted succesfully" });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

export default router;
