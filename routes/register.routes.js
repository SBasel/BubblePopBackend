import { Router } from "express";
import { userPostController } from "../controllers/todos.controllers.js";
import { emailvalidation } from "../middleware/Validate/email.validate.js";
import { namevalidation } from "../middleware/Validate/name.validate.js"
//import { passwordvalidation } from "../middleware/Validate/password.validate.js"

export const registerRoute = Router();

registerRoute.post("/",
  emailvalidation,
  namevalidation,
  userPostController, 
);



