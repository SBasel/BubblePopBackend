import { setEndTime } from '../models/model.js';
import { errorCreator } from '../lib/errorCreator.js';

export async function setEndTimeController(req, res) {
  try {

    const personalid = req.user.personalid; 
    
    if (!personalid) {
      throw errorCreator('Personal ID fehlt', 400);
    }

    await setEndTime(personalid);
    res.status(200).json({ message: 'Endzeit erfolgreich gesetzt' });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}
