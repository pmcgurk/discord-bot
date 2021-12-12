import moment from 'moment';
import getTransactions from '../db/getTransactions';
import getUser from '../db/getUser';
import formatAmount from '../lib/formatAmount';

const transactions = async (msg, splitMessage, limit = 5) => {
  const sender = msg.author;
  const UserId = sender.id;
  const currentTransactions = await getTransactions(UserId, limit);
  const parsedTransactions = await Promise.all(currentTransactions.map(async (transaction) => {
    const sender = await getUser(transaction.SenderId);
    const receiver = await getUser(transaction.ReceiverId);
    const { amount, note, createdAt } = transaction;
    return `${moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}: ${sender.name || 'The Republic'} ${amount > 0 ? 'sent' : 'fined'} ${receiver.name} ${formatAmount(amount)} ${note ? `(Note: ${note})` : ''}`;
  }));
  return `Your last ${limit} transactions:
${parsedTransactions.join('\n')}`;
};

export default transactions;
