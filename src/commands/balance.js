import getBalance from '../db/getBalance';
import formatAmount from '../lib/formatAmount';

const balance = async (msg) => {
  const sender = msg.author;
  const currentBalance = await getBalance(sender.id);
  if (currentBalance) {
    return `Here, ${sender.username}, you hiv ${formatAmount(currentBalance)} btw x`;
  }
  return 'FAILED, HAHAH';
};

export default balance;
