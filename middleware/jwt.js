import jwt from "jsonwebtoken"

export function createTokenMiddleware(req,res,next){

    console.log(req.userdate.id)

    const payload={
        iss:"",
        sub: req.userdate.id,
        aud: "",

        id: req.userdata.id,
        name: req.username,
        email: req.usermail,
    };

    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign(payload, secretKey, {expiresIn: "1h"})
    req.jwt =token;
    next();
}