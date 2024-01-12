import { validateUser } from '../models/model.js';
import { errorCreator } from '../lib/errorCreator.js';

export async function authMiddleware(req, res, next) {
  try {
    const { personalid, password } = req.body;
    const user = await validateUser(personalid, password);

    if (!user) {
      throw errorCreator('Ungültige Anmeldeinformationen', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}
