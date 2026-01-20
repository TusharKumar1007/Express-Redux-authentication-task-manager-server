import { pool } from "../../db/db.js";

export const readDb = async () => {
  const result = await pool.query("SELECT * from users;");
};

export const registerUserDb = async (userName, email, password) => {
  try {
    const query = `INSERT INTO users(username,email,password) values ($1,$2,$3) returning *`;
    const values = [userName, email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

export const checkForUserNameDb = async (userName, email) => {
  try {
    const query = `SELECT * from users WHERE username=$1 or email=$2`;
    const values = [userName, email];
    const result = await pool.query(query, values);
    return result.rowCount;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserDb = async (email) => {
  try {
    const query = `SELECT id,email,username,password from users where email=$1`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getTasksDb = async (userId) => {
  try {
    const query = `SELECT id,task,completed,ineditmode,createdat,updatedat FROM tasks WHERE userid=$1`;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteUserDb = async (userId) => {
  try {
    const query = `DELETE from users where id=$1`;
    const values = [userId];
    pool.query(query, values);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addTaskDb = async (taskId, userId, task) => {
  try {
    const query = `INSERT INTO tasks(id,userId,task) values($1,$2,$3) returning *`;
    const values = [taskId, userId, task];
    const result = pool.query(query, values);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
};
export const updateTaskDb = async (taskId, userId, task) => {
  try {
    const query = `UPDATE tasks SET task=$3 where id=$1 AND userId=$2 returning *`;
    const values = [taskId, userId, task];
    const result = pool.query(query, values);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const toggleCompleteDb = async (taskId, userId, isDone) => {
  try {
    const query = `UPDATE tasks SET completed=$3 where id=$1 AND userId=$2 returning *`;
    const values = [taskId, userId, isDone];
    const result = pool.query(query, values);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteTaskDb = async (taskId, userId) => {
  try {
    const query = `DELETE from tasks where id=$1 AND userId=$2`;
    const values = [taskId, userId];
    pool.query(query, values);
  } catch (e) {
    throw new Error(e);
  }
};
