import mysql from "mysql2";
import { config } from "dotenv";
config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on("error", (err) => {
  console.log("Poolfehler: ", err);
});

export async function safeQuery(query, params = [], retryCount = 3) {
  let connection;
  try {
    connection = await pool.promise().getConnection();
    const [results] = await connection.query(query, params);
    return results;
  } catch (err) {
    console.log(err);

    // Wenn der Fehler ein ECONNRESET ist und noch Versuche übrig sind
    if (err.code === "ECONNRESET" && retryCount > 0) {
      console.log(
        `Wiederverbindungsversuch, verbleibende Versuche: ${retryCount}`
      );

      // Verzögerung vor dem nächsten Versuch (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return safeQuery(query, params, retryCount - 1);
    }
    throw new Error(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
