import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function jwtMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentifizierung fehlgeschlagen' });
  }

  const payload = {
     personalid: req.user.personalid,
  };

 
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });


  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'strict', 
    maxAge: 3600000 
  });

  req.token = token;
  next();
}

