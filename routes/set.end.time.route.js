import { Router } from "express";
import { authToken } from '../middleware/jwt.auth.js';
import { setEndTimeController } from '../controllers/end.time.controllers.js'; 

export const endTimer = Router();


endTimer.post('/', authToken, setEndTimeController);