export function logoutController (req , res){
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0) 
  });
  return res.status(200).json({message: 'Logout erfolgreich'})
}