import { Router } from "express";
import { userPostController } from "../controllers/todos.controllers.js";
//import { uidValidator } from "./../middleware/uid.validate.js";
//import { checkValidation } from "./../middleware/validation.js";
import { emailvalidation } from "../middleware/Validate/email.validate.js";
export const registerRoute = Router();

registerRoute.post("/",
  emailvalidation, 
  userPostController, 
);



