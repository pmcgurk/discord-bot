import Transaction from '../models/transaction';
import User from '../models/user';

export default async function sendTransaction(UserId, amount, note = false) {
  if (amount > 0) {
    await User.query().where({ id: UserId }).increment('amount', amount);
  } else {
    await User.query().where({ id: UserId }).decrement('amount', amount);
  }
  if (note) {
    await Transaction.query().insert({ SenderId: null, ReceiverId: UserId, amount, note });
  }
  return true;
}
