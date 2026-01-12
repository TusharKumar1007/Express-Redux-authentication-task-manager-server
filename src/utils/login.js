import bcrypt from "bcrypt";
import { readDb } from "./readJsonFile.js";

export async function loginUser(userName, password) {
  const db = await readDb();
  const foundUser = db.find((user) => user.userName === userName);

  if (foundUser) {
    const res = await bcrypt.compare(password, foundUser.password);
    if (!res) {
      throw new Error("Invalid credientials");
    }
    return { userName, ok: true };
  } else {
    throw new Error("It seems you are not registred, Please register first");
  }
}
