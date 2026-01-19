import {
  addTaskDb,
  deleteTaskDb,
  getTasksDb,
  toggleCompleteDb,
  updateTaskDb,
} from "./dbUtils.js";
import { readDb, writeDb } from "./readJsonFile.js";

function prepareTaskObj(tId, task) {
  return {
    taskId: tId,
    title: task,
    done: false,
    goEditMode: false,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };
}

export const addTask = async (id, tId, task) => {
  try {
    const {
      id: taskId,
      task: title,
      completed: done,
      ineditmode: goEditMode,
      createdat: createdAt,
      updatedat: updatedAt,
    } = await addTaskDb(tId, id, task);

    return { taskId, title, done, goEditMode, createdAt, updatedAt };
  } catch (e) {
    throw new Error(e);
  }
};

export const getMyTasks = async (id) => {
  try {
    
    let tasks = await getTasksDb(id);
    return { tasks };
  } catch (e) {
    throw new Error(e);
  }
};

export const removeMyTask = async (userId, taskedIdRemoved) => {
  try {
    await deleteTaskDb(taskedIdRemoved, userId);

    const updatedTasks = await getTasksDb(userId);
    return updatedTasks;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateMyTask = async (userId, taskId, newTitle) => {
  try {
    await updateTaskDb(taskId, userId, newTitle);
    const resTasks = await getTasksDb(userId);

    return resTasks;
  } catch (e) {
    throw new Error(e);
  }
};

export const toggleDone = async (userId, taskId, isdone) => {
  try {
    await toggleCompleteDb(taskId, userId, isdone);
    const resTasks = await getTasksDb(userId);
    return resTasks;
  } catch (e) {
    throw new Error(e);
  }
};
