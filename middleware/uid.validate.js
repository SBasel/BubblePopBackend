import { check } from "express-validator";

export const uidValidator = check("uid")
  .notEmpty({})
  .withMessage("uid should not be empty!");
