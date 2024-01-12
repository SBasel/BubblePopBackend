import { Router } from 'express';
import { logoutController } from '../controllers/logout.controllers.js';

export const logout = Router();

logout.get('/', logoutController);

