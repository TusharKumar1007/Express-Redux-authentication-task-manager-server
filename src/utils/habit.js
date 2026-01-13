import { readDb, writeDb } from "./readJsonFile.js";

function prepareHabitObj(habit) {
  return { id: Date.now(), title: habit };
}

export const addHabit = async (id, habit) => {
  const db = await readDb();
  const index = db.findIndex((user) => user.id === id);
  db[index].habits.push(prepareHabitObj(habit));
  writeDb(db);
};

export const getMyHabits = async (id) => {
  const db = await readDb();
  const user = db.find((user) => user.id === id);
  return user.habits;
};

export const removeMyHabit = async (userId, habitId) => {
  const db = await readDb();
  const userIdx = db.findIndex((user) => user.id === userId);
  const updatedHabits = db[userIdx].habits.filter(
    (habit) => habit.id !== habitId
  );

  db[userIdx].habits = updatedHabits;
  writeDb(db);
};
