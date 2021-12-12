import { transaction } from 'objection';
import Transaction from '../models/transaction';
import User from '../models/user';
import getUser from './getUser';

const constants = '../constants';

export default async function sendTransaction(SenderId, ReceiverId, amount, note) {
  try {
    const amountParsed = parseInt(amount, 10);
    const sender = await getUser(SenderId);
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
    const receiver = await getUser(ReceiverId);
    const trx = await transaction.start(User);
    await User.query(trx).patchAndFetchById(sender.id, { amount: sender.amount - amountParsed });
    await User.query(trx).patchAndFetchById(receiver.id, { amount: receiver.amount + amountParsed });
    await Transaction.query(trx).insert({ SenderId: sender.id, ReceiverId: receiver.id, amount, note });
    await trx.commit();
    return { senderAmount: sender.amount - amountParsed, receiverAmount: receiver.amount + amountParsed };
  } catch (error) {
    return { error };
  }
}
