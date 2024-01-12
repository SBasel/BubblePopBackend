import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.login.js';
import { jwtMiddleware } from '../middleware/jwt.js';
import { loginController } from '../controllers/login.controllers.js';

export const login = Router();

login.post('/', authMiddleware, jwtMiddleware, loginController);


