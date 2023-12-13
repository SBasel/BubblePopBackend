import { errorCreator } from "../lib/errorCreator.js";
import { getAllTodos, insertUser } from "../models/todos.model.js";
import { validationResult } from "express-validator";

export async function getAllTodosController(req, res, next) {
  try {
    const data = await getAllTodos(req.headers.id);

    if (data.length === 0) {
      return next(errorCreator(404, "Daten konnten nicht gefunden werden"));
    }

    res.status(200).json({
      answer: {
        code: 200,
        data: data,
      },
    });
  } catch (error) {
    next(errorCreator(404, "Daten konnten nicht gefunden werden"));
  }
}

export async function userPostController(req, res, next) {
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
  const errorMessage = errors.array().map(error => error.msg).join(', ');
 return next(errorCreator(errorMessage, 400));
  }
 const { UserName, Passwort, Email } = req.body;
 if (!UserName || !Passwort || !Email) {
 return next(errorCreator("UserName, Passwort und Email sind erforderlich", 400));
  }
 try {
 await insertUser(req.body);
 res.status(200).json({
 answer: {
 code: 200,
 data: "User created",
  },
  });
  } catch (error) {
 next(errorCreator("Fehler beim Erstellen des Benutzers", 500));
  }
 }