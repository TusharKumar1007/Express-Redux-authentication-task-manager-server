import { hashPassword } from "./password.js";
import { generateToken } from "./jwt.js";
import { registerUserDb, checkForUserNameDb } from "./dbUtils.js";

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

    const rows = await checkForUserNameDb(userName, email);
    if (rows > 0) {
      throw new Error("User Name or email taken");
    }

    password = await hashPassword(password);
    const resUserObj = await registerUserDb(userName, email, password);
    const tasks = [];

    const { id, username: user_name, createdAt } = resUserObj;
    const token = await generateToken({ id, user_name });
    return { user: { id, userName, email, createdAt, tasks }, token };
  } catch (e) {
    throw new Error(e.message);
  }
};
