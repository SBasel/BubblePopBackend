//import session from "express-session";

export async function startGame(req, res, next) {
    const sessionId = generateUniqueId();

    const startQuery = 'INSERT INTO game_sessions (session_id, start_time, score, time_taken) VALUES (?, NOW(), 0, 0)';
    db.query(startQuery, [sessionId], (err, result) => {
        if (err) {
            console.error('Error starting game session: ' + err);
            res.status(500).json({ message: 'Error starting game session' });
        } else {
            req.session.gameStarted = true;
            req.session.sessionId = sessionId;
            res.json({ sessionId: sessionId });
        }
    });
};


export async function endGame(req, res, next) {
    const { sessionId, score, timeTaken } = req.body;
    if (roundNumber === 1 && score <= 7 && timeTaken <= 10) {
        const endQuery = 'UPDATE game_sessions SET score = ?, time_taken = ?, end_time = NOW() WHERE session_id = ?';
        db.query(endQuery, [score, timeTaken, sessionId], (err, result) => {
            if (err) {
                console.error('Error ending game session: ' + err);
                res.status(500).json({ message: 'Error ending game session' });
            } else {
                req.session.gameStarted = false;
                res.json({ message: 'Game session ended and data updated' });
            }
        });
    }
}

