import { errorCreator } from "../lib/errorCreator.js";
import { getAllTodos } from "../models/todos.model.js";

export async function getAllTodosController(req, res, next) {
  try {
    const data = await getAllTodos(req.headers.uid);

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
