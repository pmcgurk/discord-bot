import Phrase from '../models/phrase';
import getUser from './getUser';

export default async function getPhrases(UserId, text, amount) {
  try {
    const user = await getUser(UserId);
    if (user.admin) {
      return Phrase.query().whereNull('deletedAt');
    }
  } catch (err) {
    console.log(err);
  }
  return false;
}
