import User from '../models/user';
import addUser from './addUser';

export default async function getUser(UserId) {
  try {
    let user = await User.query()
      .findById(UserId)
      .whereNot({ name: 'New User' })
      .whereNull('deletedAt');
    if (!user) {
      user = await addUser(UserId);
    }
    return user;
  } catch (err) {
    console.log('User thing is fucked');
    return { amount: 0 };
  }
}
