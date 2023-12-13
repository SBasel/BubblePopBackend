import { Router } from "express";
import { loginController } from "../controllers/login.controllers.js";
//import { createTokenMiddleware } from "../middleware/jwt.js";

export const loginRoute = Router();

loginRoute.post("/", loginController);