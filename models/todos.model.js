import { safeQuery } from "../configs/db.connect.js";
import bcrypt from "bcrypt";
export async function getAllTodos(id) {
  try {
    const query = `SELECT * FROM Login WHERE id = ?`;
    const params = [id];
    const data = await safeQuery(query, params);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function insertUser(data) {
  const { UserName, Passwort, Email } = data;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Passwort,salt);
    await 
    db.execute(
      "INSERT INTO `Login` (UserName, Passwort, Email) VALUES (?, ?, ?)",
      [UserName, hashedPassword, Email]
    );
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function updateUser(data) {
  const { id, firstname } = data;

  try {
    db.execute("UPDATE `user` SET `firstname` = ? WHERE id = ?", [
      firstname,
      id,
    ]);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function deleteUser(data) {
  const { id } = data;

  try {
    db.execute("DELETE FROM `user` WHERE id = ?", [id]);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}