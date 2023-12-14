import { Router } from "express";
import { logoutController } from "../controllers/logout.controllers.js";

export const logoutRoute = Router();

logoutRoute.post('/', logoutController);