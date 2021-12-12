import getUser from '../db/getUser';
import sendTransaction from '../db/sendTransaction';
import formatAmount from '../lib/formatAmount';

const transfer = async (msg, splitMessage) => {
  const sender = await getUser(msg.author.id);
  const receiver = await getUser(msg.mentions.users.first().id);
  const amount = splitMessage[2];
  const note = splitMessage.slice(3, splitMessage.length).join(' ');
  const result = await sendTransaction(sender.id, receiver.id, amount, note);
  if (result && !result.error) {
    return `You transferred ${receiver.name}: ${formatAmount(amount)}. You now have ${formatAmount(result.senderAmount)}, and they have ${formatAmount(result.receiverAmount)} x`;
  }
  if (result.error) {
    return `HAHA FAILED: ${result.error}`;
  }
  return 'FAILED, HAHAH';
};

export default transfer;
