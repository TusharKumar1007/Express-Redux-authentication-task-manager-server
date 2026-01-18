import { deleteUserDb } from "./dbUtils.js";
import { readDb, writeDb } from "./readJsonFile.js";

export const deleteAccount = async (curUserId) => {
  try {
    await deleteUserDb(curUserId);
  } catch (e) {
    throw new Error(e.message);
  }
};
