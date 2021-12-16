import User from '../models/user';

export default async function getScoreboard() {
  const users = await User
    .query()
    .orderBy('amount', 'DESC')
    .whereNot({ name: 'New User' })
    .whereNull('deletedAt');
  return users;
}
