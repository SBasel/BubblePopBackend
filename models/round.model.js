

const createTables = () => {
    const createUsersTable = `CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        session_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    const createGameSessionsTable = `CREATE TABLE IF NOT EXISTS game_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(255) UNIQUE,
        start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_time TIMESTAMP,
        score INT DEFAULT 0,
        time_taken INT DEFAULT 0
    )`;
    const createPlayersTable = `CREATE TABLE IF NOT EXISTS players (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    db.query(createUsersTable, (err, result) => {
        if (err) throw err;
        console.log('user_sessions table created');
    });
    db.query(createGameSessionsTable, (err, result) => {
        if (err) throw err;
        console.log('game_sessions table created');
    });
    db.query(createPlayersTable, (err, result) => {
        if (err) throw err;
        console.log('players table created');
    });
};

createTables();