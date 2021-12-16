import getUsername from '../lib/getUsername';
import User from '../models/user';

export default async function addUser(UserId, startAmount = 0) {
  const newUser = { id: UserId, name: 'New User', amount: startAmount };
  return User.query().insert(newUser);
}
