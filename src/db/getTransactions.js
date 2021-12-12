import Transaction from '../models/transaction';

export default async function getTransactions(UserId, limit) {
  try {
    return Transaction.query().where({ SenderId: UserId }).orWhere({ ReceiverId: UserId }).limit(limit).orderBy('createdAt', 'DESC');
  } catch (error) {
    return { error };
  }
}
