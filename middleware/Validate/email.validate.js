import { check } from "express-validator";

export const emailvalidation = check("Email")
  .isEmail()
  .normalizeEmail()
  .trim()
  .escape()
  .withMessage("Dies ist keine korrekte Email");
