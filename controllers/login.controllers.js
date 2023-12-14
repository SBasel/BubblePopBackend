import bcrypt from "bcrypt";
import { findUserByEmail } from "../models/todos.model.js";
import { errorCreator } from "../lib/errorCreator.js";

export async function loginController(req, res, next){
const {Email, Passwort} = req.body;

try{
  const user = await findUserByEmail(Email);
  if(user && await bcrypt.compare(Passwort, user.Passwort)) {
    req.user = {id: user.id, Email: user.Email};
    delete req.body.Passwort
  next();
  }else {
    return next(errorCreator("Ungültige Anmeldeinformation", 401));
  }
}catch (error) {
    next(errorCreator("Fehler beim Login", 500));
  }
}