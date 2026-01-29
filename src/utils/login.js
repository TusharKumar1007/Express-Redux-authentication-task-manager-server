import bcrypt from "bcrypt";
import { readDb } from "./readJsonFile.js";
import { generateToken } from "./jwt.js";
import { getTasksDb, getUserDb } from "./dbUtils.js";

export async function loginUser(email, password) {

  const foundUser = await getUserDb(email);

  if (foundUser) {
    const res = await bcrypt.compare(password, foundUser.password);
    if (!res) {
      throw new Error("Invalid credientials, Register yourself if not");
    }

    const tasks = await getTasksDb(foundUser.id);
    const { id, email, username: user_name } = foundUser;

    const token = await generateToken({ id, user_name });

    return { user: { id, email, userName: user_name, tasks }, token };
  } else {
    throw new Error("It seems you are not registred, Please register first");
  }
}
