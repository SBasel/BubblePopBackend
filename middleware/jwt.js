import jwt from "jsonwebtoken"
import { errorCreator } from "../lib/errorCreator.js";

const JWT_SECRET = process.env.JWT_SECRET;

export function createTokenMiddleware(req, res, next){

    if (!req.user){
        return next(errorCreator("Keine Benutzerdaten gefunden", 401));
    }

    const payload={
       
        id: req.user.id,
        Email: req.user.Email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"})
    req.token = token;
    res.cookie('token', token, {
        httpOnly: true, 
        secure: true, // weil es lokal ist" - https:true 
        sameSite: 'Strict',
        maxAge: 3600000
    });
    res.status(200).json({message:"Login erfolgreich", body:req.body, user:req.user });
}