import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getMyTasks } from "../utils/task.js";

const router = Router();

router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    const { id, user_name: userName } = req.user;
    if (!id) {
      res.json({});
      return;
    }
    const { tasks } = await getMyTasks(id);

    res.json({ userName, tasks });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

export default router;
