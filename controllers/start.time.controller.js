import { setStartTime } from '../models/model.js';
import { errorCreator } from '../lib/errorCreator.js';


export async function setStartTimeController(req, res) {
  try {
    
    const personalid = req.user.personalid; 

    if (!personalid) {
      throw errorCreator('Personal ID fehlt', 400);
    }

    await setStartTime(personalid);
    res.status(200).json({ message: 'Startzeit erfolgreich gesetzt' });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}


