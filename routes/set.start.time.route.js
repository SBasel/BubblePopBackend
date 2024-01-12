import { Router } from "express";
import { authToken } from '../middleware/jwt.auth.js';
import { setStartTimeController } from '../controllers/start.time.controller.js'; 

export const startTimer = Router();


startTimer.post('/', authToken, setStartTimeController);

