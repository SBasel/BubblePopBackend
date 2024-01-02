import { errorCreator } from "../lib/errorCreator.js";
import { deleteUser } from "../models/todos.model.js";

export async function deleteUserContoller(req, res, next) {
  const userEmail = req.user.Email;
  const { Email } = req.body;

  if (userEmail !== Email) {
    return next(
      errorCreator("Nicht Authorisiert, diesen Benutzer zu löschen!", 403)
    );
  }

  try {
    const result = await deleteUser(Email);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Benutzer nicht gefunden",
      });
    } else {
      // Löschen des Cookies beim erfolgreichen Löschen des Benutzers
      res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
      });
      res.status(200).json({
        message: "Benutzer erfolgreich gelöscht!",
      });
    }
  } catch (error) {
    next(errorCreator("Fehler beim löschen des Benutzer", 500));
  }
}

