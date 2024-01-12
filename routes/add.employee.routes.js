import { Router } from 'express';
import { addEmployeeController } from '../controllers/add.employee.controller.js';

export const add = Router();

add.post('/', addEmployeeController);


