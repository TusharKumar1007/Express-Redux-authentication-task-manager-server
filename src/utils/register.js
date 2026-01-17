import { hashPassword } from "./password.js";
import { readDb } from "./readJsonFile.js";
import { writeDb } from "./readJsonFile.js";
import { generateToken } from "./jwt.js";

const prepareUserObj = (userName, password, email) => {
  return {
    id: Date.now(),
    email: email,
    userName: userName,
    password: password,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    tasks: [],
  };
};

export const registerUser = async (userName, password, email) => {
  try {
    if (!userName || !password || !email) {
      throw new Error("Please fill all inputs");
    }
    const db = await readDb();
    const isEmailExists = db.find((user) => user.email === email);
    const isUserNameTaken = db.find((user) => user.userName === userName);
    if (isUserNameTaken || isEmailExists) {
      throw new Error("User Name already taken");
    }
    password = await hashPassword(password);

    const resUserObj = prepareUserObj(userName, password, email);
    db.push(resUserObj);
    writeDb(db);
    const { id, userName: user_name, createdAt, tasks } = resUserObj;
    const token = await generateToken({ id, user_name });

    return { user: { id, userName, email, createdAt, tasks }, token };
  } catch (e) {
    throw new Error(e.message);
  }
};
