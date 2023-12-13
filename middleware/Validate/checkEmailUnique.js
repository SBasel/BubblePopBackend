import { isEmailUnique } from '../../models/todos.model.js';
import { errorCreator } from '../../lib/errorCreator.js';

export async function checkEmailUnique(req, res, next) {
const { Email } = req.body;
try {
const emailUnique = await isEmailUnique(Email);
if (!emailUnique) {
return next(errorCreator("E-Mail-Adresse ist bereits in Verwendung", 400));
 }
next();
 } catch (error) {
next(error);
 }
}