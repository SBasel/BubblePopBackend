import { addEmployee } from '../models/model.js';
import { errorCreator } from '../lib/errorCreator.js';

export async function addEmployeeController(req, res) {
  try {
    const { vorname, nachname, personalid, password } = req.body;

    if (!vorname || !nachname || !personalid || !password) {
      throw errorCreator('Fehlende Daten', 400);
    }

    const newEmployee = await addEmployee(vorname, nachname, personalid, password);
    res.status(201).json({ message: 'Mitarbeiter erfolgreich hinzugefügt', employee: newEmployee });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}