import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  addTask,
  getMyTasks,
  removeMyTask,
  updateMyTask,
} from "../utils/task.js";

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
    const { taskTitle } = req.body;

    const { taskId, title, done, goEditMode, createdAt, updatedAt } =
      await addTask(id, taskTitle);

    if (!taskId) {
      res.status(500).json({ message: "Unable to add habit" });
      return;
    }

    res.json({ taskId, title, done, goEditMode, createdAt, updatedAt });
  } catch (e) {
    res.status(401).json({ error: "bad request" });
  }
});

router.delete("/removeTask", async (req, res) => {
  try {
    const { id, user_name } = req.user;
    const { taskId } = req.body;

    const updatedTasks = await removeMyTask(id, taskId);

    res
      .json({
        message: "updated tasks successfully",
        updatedTasks,
      })
      .status(201);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.put("/updateTask", async (req, res) => {
  try {
    const { id, user_name } = req.user;
    const { taskId, newTitle } = req.body;
    const updatedTasks = await updateMyTask(id, parseInt(taskId), newTitle);

    res
      .json({
        message: "updated tasks successfully",
        updatedTasks,
      })
      .status(201);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

export default router;
