import { Router } from 'express';
import { authToken } from '../middleware/jwt.auth.js'
import { timestampsController } from '../controllers/time.stamp.controller.js';

export const getTime = Router();

getTime.get('/', authToken, timestampsController);


