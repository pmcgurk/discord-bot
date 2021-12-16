import User from '../models/user';

export default async function getScoreboard() {
  const users = await User.query().orderBy('amount', 'DESC').whereNot({ id: '918900485484851251' }).whereNull('deletedAt');
  return users;
}
