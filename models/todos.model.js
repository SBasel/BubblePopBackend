import { safeQuery } from "../configs/db.connect.js";
import bcrypt from "bcrypt";
import { errorCreator } from "../lib/errorCreator.js";
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
    const insertQuery =
      "INSERT INTO `Login` (UserName, Passwort, Email) VALUES (?, ?, ?)";
      await safeQuery(insertQuery, [UserName, hashedPassword, Email]
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

export async function isEmailUnique(Email) {
  const query  = 'SELECT * FROM Login WHERE Email = ?';
  const params = [Email];

  try{
 const result = await safeQuery(query, params);
 return result.length === 0;
 } catch (error){
  throw errorCreator('Fehler bei der Datenbankabfrage', 500)
 }}

 export async function findUserByEmail(Email){
  const query = 'SELECT * FROM Login WHERE Email = ?';
  const params = [Email];
  try{
    const result = await safeQuery(query, params);
    return result[0] || null;
  }catch (error){
      throw errorCreator('Fehler bei der Datenbankabfrage', 500)
     }}