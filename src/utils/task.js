import { readDb, writeDb } from "./readJsonFile.js";

function prepareHabitObj(task) {
  return { id: Date.now(), title: task };
}

export const addTask = async (id, task) => {
  try {
    const db = await readDb();
    const index = db.findIndex((user) => user.id === id);
    db[index].tasks.push(prepareHabitObj(task));
    writeDb(db);
  } catch (e) {
    throw new Error(e);
  }
};

export const getMyTasks = async (id) => {
  try {
    const db = await readDb();
    const user = db.find((user) => user.id === id);
    return user.tasks;
  } catch (e) {
    throw new Error(e);
  }
};

export const removeMyTask = async (userId, taskId) => {
  try {
    const db = await readDb();
    const userIdx = db.findIndex((user) => user.id === userId);
    const updatedHabits = db[userIdx].tasks.filter(
      (habit) => habit.id !== taskId
    );

    db[userIdx].tasks = updatedHabits;
    writeDb(db);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateMyTask = async (userId, taskId, newTitle) => {
  try {
    const db = await readDb();
    const userIdx = db.findIndex((user) => user.id === userId);
    const taskToUpdateId = db[userIdx].tasks.findIndex(
      (task) => task.id === taskId
    );

    db[userIdx].tasks[taskToUpdateId].title = newTitle;
    writeDb(db);
  } catch (e) {
    throw new Error(e);
  }
};
