import { readDb, writeDb } from "./readJsonFile.js";

export const deleteAccount = async (curUserId) => {
  try {
    const db = await readDb();
    const doesUserExist = db.find((user) => user.id === curUserId);


    if (!doesUserExist) {
      throw new Error("Bad Request");
    }
    const updatedDb = db.filter((user) => user.id !== doesUserExist.id);

    writeDb(updatedDb);
  } catch (e) {
    throw new Error(e.message);
  }
};
