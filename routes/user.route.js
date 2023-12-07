import { Router } from "express";
import {
  userSignIncontroller,
  userSignUpController,
} from "../controller/user.controller.js";
import { emailvalidation } from "../middlewares/validate/email.validate.js";
import { validationHandler } from "../middlewares/validate/validation.js";
import { namevalidation } from "../middlewares/validate/name.validate.js";
import { passwordvalidation } from "../middlewares/validate/password.validate.js";

export const userRouter = Router();

userRouter.post(
  "/",
  emailvalidation,
  namevalidation,
  passwordvalidation,
  validationHandler,
  userSignUpController
);

userRouter.get("/", emailvalidation, userSignIncontroller);
