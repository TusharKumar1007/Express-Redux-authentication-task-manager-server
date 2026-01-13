import { readDb, writeDb } from "./readJsonFile.js";

export const addHabit = async (id, habit) => {
  const db = await readDb();
  const index = db.findIndex((user) => user.id === id);
  db[index].habits.push(habit);
  writeDb(db);
};

export const getHabit = async (id) => {
  const db = await readDb();
  const user = db.find((user) => user.id === id);
  return user.habits;
};
