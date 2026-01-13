import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { addHabit, getHabit } from "../utils/habit.js";

const router = Router();

router.use(authenticateToken);

router.get("/", async (req, res) => {
  // console.log(req.user);

  const { id, user_name } = req.user;

  const habit = await getHabit(id);

  res.json({ user_name, habits: habit });
});

router.post("/addHabit", async (req, res) => {
  try {
    const { id } = req.user;
    const { habit } = req.body;
    

    const addedHabitStatus = addHabit(id, habit);
    if (!addedHabitStatus) {
      res.status(500).json({ message: "Unable to add habit" });
    }

    res.json({ message: "successfully Added habit" });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

export default router;
