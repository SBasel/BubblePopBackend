import { getUserTimestamps } from '../models/model.js';
import { errorCreator } from '../lib/errorCreator.js';

export async function timestampsController(req, res) {
  try {
    const personalid = req.user.personalid;

    if (!personalid) {
      throw errorCreator('Personal ID fehlt', 400);
    }

    const timestamps = await getUserTimestamps(personalid);
    res.status(200).json(timestamps);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}
