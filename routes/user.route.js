import { Router } from "express";
import {
  userSignIncontroller,
  userSignUpController,
} from "../controller/user.controller.js";
import { emailvalidation } from "../middlewares/validate/email.validate.js";
import { validationHandler } from "../middlewares/validate/validation.js";
import { namevalidation } from "../middlewares/validate/name.validate.js";
import { passwordvalidation } from "../middlewares/validate/password.validate.js";
import { roundvalidation } from "../middlewares/validate/round.validate.js";
import { startGame, endGame } from "../controller/round.controller.js";

export const userRouter = Router();

userRouter.post(
  "/",
  emailvalidation,
  namevalidation,
  passwordvalidation,
  validationHandler,
  userSignUpController,
  roundvalidation,
);

userRouter.get("/", emailvalidation, userSignIncontroller);

// Route zum Starten einer neuen Spielsitzung
userRouter.post('/startGameSession', startGame);


// Route zum Beenden des Spiels und zum Aktualisieren der Daten
userRouter.post('/endGameSession', endGame);

