import bcrypt from "bcrypt";

export function hashPassword(password) {
  return bcrypt.hash(password, 12);
}
