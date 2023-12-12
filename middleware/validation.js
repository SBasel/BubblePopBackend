import { validationResult } from "express-validator";

export function checkValidation(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(404).json({
      errors: err.array(),
    });
  } else {
    next();
  }
}
