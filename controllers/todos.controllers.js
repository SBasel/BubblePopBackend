import { errorCreator } from "../lib/errorCreator.js";
import { getAllTodos, insertUser } from "../models/todos.model.js";

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
  const {UserName, Passwort, Email} = req.body;

  if (!UserName || !Passwort || !Email) {
    next(errorCreator("UserName, Passwort &  Email is required"));
    return;
  }

  await insertUser(req.body);
  res.status(200).json({
    answer: {
      code: 200,
      data: "User created",
    },
  });
}