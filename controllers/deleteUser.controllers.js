import { errorCreator } from "../lib/errorCreator.js";
import { deleteUser } from "../models/todos.model.js";

export async function deleteUserContoller(req, res, next){
  const {Email} = req.body;
  
  try{
    const result = await deleteUser(Email);
    if (result.affectedRows === 0){
      return res.status(404).send('Benutzer nicht gefunden');
  } 
    res.status(200).send('Benutzer erfolgreich gelöscht!');
    }
    catch (error) {
    next(errorCreator("Fehler beim löschen des Benutzer", 500));
  }}
