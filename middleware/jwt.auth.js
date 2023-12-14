import jwt from 'jsonwebtoken';
import { errorCreator } from "../lib/errorCreator.js";


export function authToken(req, res, next){
const token = req.cookies['token'];

if (!token){
  return next(errorCreator("Kein Authentifizierungstoken gefunden", 401));
}
jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
  if (err){
    return next(errorCreator("Ungültiges oder abgelaufenes Token", 403));
  }
  req.user = user;
  next();
});
}
