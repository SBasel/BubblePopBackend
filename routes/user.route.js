import { Router } from "express";
import {
  userSignIncontroller,
  userSignUpController,
} from "../controller/user.controller.js";
import { emailvalidation } from "../middlewares/validate/email.validate.js";
import { validationHandler } from "../middlewares/validate/validation.js";
import { namevalidation } from "../middlewares/validate/name.validate.js";
import { passwordvalidation } from "../middlewares/validate/password.validate.js";

export const userRouter = Router();

userRouter.post(
  "/",
  emailvalidation,
  namevalidation,
  passwordvalidation,
  validationHandler,
  userSignUpController
);

userRouter.get("/", emailvalidation, userSignIncontroller);


//Logik

app.post('/validateRound', (req, res) => {
    const { sessionId, roundNumber, score, timeTaken } = req.body;

    // Prüfen, ob die Daten im erlaubten Bereich liegen
    if (roundNumber === 1 && score <= 7 && timeTaken <= 10) {
        // Daten sind valide, aktualisieren Sie die Datenbank
        const query = 'UPDATE game_sessions SET score = ? WHERE session_id = ?';
        db.query(query, [score, sessionId], (err, result) => {
            if (err) {
                res.status(500).send('Fehler bei der Datenbankaktualisierung');
            } else {
                res.send('Runde validiert und Datenbank aktualisiert');
            }
        });
    } else {
        res.status(400).send('Ungültige Spielrundendaten');
    }
});

app.post('/startGameSession', (req, res) => {
    // Generieren einer einzigartigen Session-ID
    const sessionId = generateUniqueId(); // Implementieren Sie eine Funktion, um eine einzigartige ID zu generieren

    // Datenbankbefehl, um eine neue Session zu starten
    const query = 'INSERT INTO game_sessions (session_id, start_time) VALUES (?, NOW())';
    db.query(query, [sessionId], (err, result) => {
        if (err) {
            res.status(500).send('Fehler beim Starten der Session');
        } else {
            res.json({ sessionId: sessionId });
        }
    });
});

function generateUniqueId() {
    // Implementieren Sie Ihre Logik zur Generierung einer einzigartigen ID
    // Z.B. UUID oder eine andere Methode
    return require('crypto').randomBytes(16).toString('hex');
}

app.post('/startGameSession', (req, res) => {
    if (!req.session.sessionId) {
        req.session.sessionId = generateUniqueId(); // Generiert eine einzigartige Session-ID
    }
    res.send('Session gestartet, ID: ' + req.session.sessionId);
});