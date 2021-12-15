import Phrase from '../models/phrase';
import getUser from './getUser';

export default async function editUser(UserId, text, amount) {
  try {
    const user = await getUser(UserId);
    if (user.admin) {
      return Phrase.query().where({ text }).patch({ amount });
    }
  } catch (err) {
    console.log(err);
  }
  return false;
}
