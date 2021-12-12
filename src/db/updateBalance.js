import Transaction from '../models/transaction';
import User from '../models/user';
import getUser from './getUser';

export default async function sendTransaction(UserId, amount, note = false) {
  const user = await getUser(UserId);
  await User.query().patchAndFetchById(UserId, { amount: user.amount + amount });
  if (note) {
    await Transaction.query().insert({ SenderId: null, ReceiverId: UserId, amount, note });
  }
  return true;
}
