import { safeQuery } from "../configs/db.connect.js";

export async function getAllTodos(uid) {
  try {
    const query = `SELECT * FROM todos WHERE uid = ?`;
    const params = [uid];
    const data = await safeQuery(query, params);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
