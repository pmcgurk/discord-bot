import Transaction from '../models/transaction';
import User from '../models/user';

export default async function updateBalance(UserId, amount, note = false) {
  const curUser = await User.query().findById(UserId);
  if (curUser.amount + amount >= 0 || amount > 0) {
    const user = await User.query().where({ id: UserId }).increment('amount', amount).returning('*');
    if (note) {
      await Transaction.query().insert({ SenderId: null, ReceiverId: UserId, amount, note });
    }
    return user[0];
  }
  return curUser[0];
}
