
export function loginController(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'Nicht authentifiziert' });
  }

  res.status(200).json({
    message: 'Erfolgreich eingeloggt',
    personalID: req.user.personalid  
  });
}



