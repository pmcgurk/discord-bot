import moment from 'moment';
import Phrase from '../models/phrase';
import getUser from './getUser';

export default async function deleteUser(UserId, text) {
  try {
    const user = await getUser(UserId);
    if (user.admin) {
      return Phrase.query().where({ text }).patch({ deletedAt: moment().toISOString() });
    }
  } catch (err) {
    console.log(err);
  }
  return false;
}
