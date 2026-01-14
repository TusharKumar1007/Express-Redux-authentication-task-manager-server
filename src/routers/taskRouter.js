import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { addTask, getMyTasks, removeMyTask } from "../utils/task.js";

const router = Router();

router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    const { id, user_name } = req.user;

    const task = await getMyTasks(id);

    res.json({ user_name, tasks: task });
  } catch (e) {
    res.status(401).json({ error: "bad request" });
  }
});

router.post("/addTask", async (req, res) => {
  try {
    const { id } = req.user;
    const { habit } = req.body;

    const addedHabitStatus = addTask(id, habit);
    if (!addedHabitStatus) {
      res.status(500).json({ message: "Unable to add habit" });
    }

    res.json({ message: "successfully Added habit" });
  } catch (e) {
    res.status(401).json({ error: "bad request" });
  }
});

router.put("/removeHabit", async (req, res) => {
  try {
    const { id, user_name } = req.user;
    const { habitId } = req.body;
    removeMyTask(id, habitId);

    res
      .json({
        message: "updated tasks successfully",
        user: { id, user_name },
      })
      .status(201);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

export default router;
