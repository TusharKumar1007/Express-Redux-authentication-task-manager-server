import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const db_path = path.join(_dirname, "..", "..", "/db", "db.json");

export async function readDb(id = null) {
  const res = await fs.readFile(db_path, "utf-8");
  const data = await JSON.parse(res);
  if (!id) {
    return data;
  }

  const curTask = data.find((task) => task.id === id);
  if (curTask) {
    return curTask;
  }
  return null;
}

export async function writeDb(db) {
  try {
    fs.writeFile(db_path, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("Failed to write DB:", err);
    throw err;
  }
}
