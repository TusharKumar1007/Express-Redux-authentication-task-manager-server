import { readDb, writeDb } from "./readJsonFile.js";

function prepareHabitObj(task) {
  return {
    taskId: Date.now(),
    title: task,
    done: false,
    goEditMode: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const addTask = async (id, task) => {
  try {
    const db = await readDb();
    const index = db.findIndex((user) => user.id === id);
    const { taskId, title, done, goEditMode, createdAt, updatedAt } =
      prepareHabitObj(task);

    db[index].tasks.push({
      taskId,
      title,
      done,
      goEditMode,
      createdAt,
      updatedAt,
    });
    writeDb(db);

    return { taskId, title, done, goEditMode, createdAt, updatedAt };
  } catch (e) {
    throw new Error(e);
  }
};

export const getMyTasks = async (id) => {
  try {
    const db = await readDb();
    const { userName, tasks } = db.find((user) => user.id === id);
    return { userName, tasks };
  } catch (e) {
    throw new Error(e);
  }
};

export const removeMyTask = async (userId, taskedIdRemoved) => {
  try {
    const db = await readDb();
    const userIdx = db.findIndex((user) => user.id === userId);
    const updatedTasks = db[userIdx].tasks.filter(
      (task) => task.taskId !== taskedIdRemoved
    );

    db[userIdx].tasks = updatedTasks;
    writeDb(db);
    return updatedTasks;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateMyTask = async (userId, taskId, newTitle) => {
  try {
    const db = await readDb();
    const userIdx = db.findIndex((user) => user.id === userId);
    const taskToUpdateId = db[userIdx].tasks.findIndex(
      (task) => task.taskId === taskId
    );

    db[userIdx].tasks[taskToUpdateId].title = newTitle;
    db[userIdx].tasks[taskToUpdateId].goEditMode = false;
    writeDb(db);
    return db[userIdx].tasks;
  } catch (e) {
    throw new Error(e);
  }
};

export const toggleDone = async (userId, taskId, isdone) => {
  try {

    
    const db = await readDb();
    const userIdx = db.findIndex((user) => user.id === userId);
    const taskToUpdateId = db[userIdx].tasks.findIndex(
      (task) => task.taskId === taskId
    );

    db[userIdx].tasks[taskToUpdateId].done = isdone;
    db[userIdx].tasks[taskToUpdateId].goEditMode = false;
    writeDb(db);

    
    return db[userIdx].tasks;
  } catch (e) {
    throw new Error(e);
  }
};
