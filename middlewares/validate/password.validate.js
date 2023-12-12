import { check } from "express-validator";

export const passwordvalidation = check("score")
  .matches(/^(?=.*[A-Z]).{8,}$/)
  .escape()
  .trim()
  .withMessage("Das Passwort ist zu unsicher");


