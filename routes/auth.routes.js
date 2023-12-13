import { Router } from "express";
import { loginController } from "../controllers/login.controllers.js";
import { createTokenMiddleware } from "../middleware/jwt.js";
import { emailvalidation } from "../middleware/Validate/email.validate.js";
import { passwordvalidation } from "../middleware/Validate/password.validate.js";

export const loginRoute = Router();



loginRoute.post("/",
  emailvalidation,
  passwordvalidation,
  loginController,
  createTokenMiddleware,
 );
