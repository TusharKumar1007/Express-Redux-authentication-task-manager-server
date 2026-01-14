import bcrypt from "bcrypt";
import { readDb } from "./readJsonFile.js";
import { generateToken } from "./jwt.js";

export async function loginUser(email, password) {
  const db = await readDb();
  const foundUser = db.find((user) => user.email === email);

  if (foundUser) {
    const res = await bcrypt.compare(password, foundUser.password);
    if (!res) {
      throw new Error("Invalid credientials, Register your self if not");
    }
    const { id, email, userName: user_name,tasks } = foundUser;
    const token = await generateToken({ id, user_name });

    return { user: { id, email, userName: user_name, tasks }, token };
  } else {
    throw new Error("It seems you are not registred, Please register first");
  }
}
