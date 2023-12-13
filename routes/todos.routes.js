import { Router } from "express";
import { getAllTodosController, userPostController } from "../controllers/todos.controllers.js";
//import { uidValidator } from "./../middleware/uid.validate.js";
//import { checkValidation } from "./../middleware/validation.js";

export const todoRoute = Router();

todoRoute.get("/", getAllTodosController);

todoRoute.post("/", userPostController)