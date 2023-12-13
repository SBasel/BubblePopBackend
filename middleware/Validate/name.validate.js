import { check } from "express-validator";

export const namevalidation = check("UserName")
  .isLength({ min: 2 })
  .escape()
  .trim()
  .withMessage("Das Name muss 2 Zeichen lang sein");
