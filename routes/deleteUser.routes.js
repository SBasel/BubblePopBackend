import { Router } from "express";
import { deleteUserContoller } from "../controllers/deleteUser.controllers.js";
import { authToken } from "../middleware/jwt.auth.js";


export const deleteUserRoute = Router();



deleteUserRoute.delete('/',authToken, deleteUserContoller);
