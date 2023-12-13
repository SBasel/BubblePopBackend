import express from "express";
import crypto from "crypto";
import session from "express-session";
import mongoose from "mongoose";

const app = express();

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));



app.use(express.json());

function generateUniqueId() {
    return crypto.randomBytes(16).toString('hex');
}


// Middleware, um zu prüfen, ob das Spiel gestartet ist
function checkGameStarted(req, res, next) {
    if (!req.session.gameStarted) {
        res.status(400).json({ message: 'Game not started' });
    } else {
        next();
    }
}
// Middleware, um zu überprüfen, ob das Spiel beendet ist
function checkGameEnded(req, res, next) {
    if (req.session.gameStarted) {
        res.status(400).json({ message: 'Game not ended' });
    } else {
        next();
    }
}







