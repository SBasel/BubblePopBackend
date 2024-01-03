import jwt from "jsonwebtoken";
import { errorCreator } from "../lib/errorCreator.js";



export function  createTokenMiddleware(req, res, next) {
  if (!req.user) {
    return next(errorCreator("Keine Benutzerdaten gefunden", 401));
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  const payload = {
    id: req.user.id,
    Email: req.user.Email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false, // weil es lokal ist" - https:true
      sameSite: "strict",
      maxAge: 3600000,
    })
    .json({ message: "Login erfolgreich", body: req.body, user: req.user });
}
