import Transaction from '../models/transaction';
import updateBalance from '../db/updateBalance';
import getUser from './getUser';
import constants from '../constants';

export default async function sendTransaction(SenderId, ReceiverId, amount, note) {
  try {
    const amountParsed = parseInt(amount, 10);
    const sender = await getUser(SenderId);
    const receiver = await getUser(ReceiverId);
    if (!receiver) {
      throw new Error('User disnae exist. Probably deleted or you\'re just a fanny');
    }
    if (SenderId === ReceiverId) {
      throw new Error(`M8 ye cannae send yerself ${constants.currencyNamePlural}`);
    }
    if (!Number.isInteger(amountParsed)) {
      throw new Error('You can only transfer numbers. Idiot.');
    }
    if (amountParsed <= 0) {
      throw new Error('You trying to be smart? Needs to be a positive number you stupid cunt');
    }
    if (amountParsed % 1 !== 0) {
      throw new Error('No decimals, pls');
    }
    if (sender.amount - amountParsed < 0) {
      throw new Error('Hahaha ye dinnae hiv enoughhh');
    }
    const updatedSender = await updateBalance(SenderId, -amountParsed);
    const updatedReceiver = await updateBalance(ReceiverId, amountParsed);
    await Transaction.query().insert({ SenderId: sender.id, ReceiverId, amount, note });
    return { senderAmount: updatedSender.amount, receiverAmount: updatedReceiver.amount };
  } catch (error) {
    return { error };
  }
}
