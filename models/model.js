import { safeQuery } from "../configs/db.connect.js";
import { errorCreator } from "../lib/errorCreator.js";
import bcrypt from 'bcrypt';


export async function validateUser(personalid, password) {
  const query = 'SELECT * FROM worker WHERE personalid = ?';
  const params = [personalid];

  try {
    const result = await safeQuery(query, params);
    if (result.length === 0) {

      throw errorCreator('Benutzer nicht gefunden', 404);
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {

      throw errorCreator('Ungültiges Passwort', 401);
    }  
    return user;
  } catch (error) {
    throw error; 
  }
};


export async function getUserTimestamps(personalid) {
  const query = 'SELECT * FROM timestamps WHERE worker_personalid = ?';
  const params = [personalid];

  try {
    const results = await safeQuery(query, params);
    return results;
  } catch (error) {
    throw new Error('Fehler beim Abrufen der Zeitstempel');
  }
}



export async function setStartTime(personalid) {
  const checkQuery = 'SELECT * FROM timestamps WHERE worker_personalid = ? AND end_timestamp IS NULL';
  const checkParams = [personalid];
  const checkResult = await safeQuery(checkQuery, checkParams);

  if (checkResult.length > 0) {
    throw errorCreator('Startzeit bereits gesetzt', 400);
  }

  const query = 'INSERT INTO timestamps (worker_personalid, start_timestamp) VALUES (?, NOW())';
  const params = [personalid];
  try {
    const result = await safeQuery(query, params);
    return result;
  } catch (error) {
    throw errorCreator('Fehler bei der Festlegung der Startzeit', 500);
  }
};

export async function setEndTime(personalid) {
  const checkQuery = 'SELECT * FROM timestamps WHERE worker_personalid = ? AND end_timestamp IS NULL ORDER BY start_timestamp DESC LIMIT 1';
  const checkParams = [personalid];
  const checkResult = await safeQuery(checkQuery, checkParams);

  if (checkResult.length === 0) {
    throw errorCreator('Keine aktive Startzeit gefunden', 404);
  }


  const updateQuery = 'UPDATE timestamps SET end_timestamp = NOW() WHERE id = ?';
  const updateParams = [checkResult[0].id];
  try {
    const result = await safeQuery(updateQuery, updateParams);
    return result;
  } catch (error) {
    throw errorCreator('Fehler bei der Aktualisierung der Endzeit', 500);
  }
};

export async function addEmployee(vorname, nachname, personalid, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO worker(vorname, nachname, personalid, password) VALUES (?, ?, ?, ?)';
  const params = [vorname, nachname, personalid, hashedPassword];

  try {
    await safeQuery(query, params);
    return { vorname, nachname, personalid };
  } catch (error) {
    throw errorCreator('Fehler beim Hinzufügen des Mitarbeiters', 500);
  }
}

