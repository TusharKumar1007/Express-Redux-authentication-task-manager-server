import bcrypt from "bcrypt";
import { readDb } from "./readJsonFile.js";

export async function loginUser(email, password) {
  const db = await readDb();
  const foundUser = db.find((user) => user.email === email);

  if (foundUser) {
    const res = await bcrypt.compare(password, foundUser.password);
    if (!res) {
      throw new Error("Invalid credientials, Register your self if not");
    }
    const { id, email } = foundUser;
    return { id, email };
  } else {
    throw new Error("It seems you are not registred, Please register first");
  }
}
