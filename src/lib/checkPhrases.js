import Phrase from '../models/phrase';
import updateBalance from '../db/updateBalance';
import formatAmount from './formatAmount';
import checkSentiment from './checkSentiment';

export default async function checkPhrases(msg, text) {
  const UserId = msg.author.id;
  const phrase = await Phrase.query().where({ text }).first();
  if (phrase) {
    console.log(`${msg.author} said ${text}, ${formatAmount(phrase.amount)}!`);
    const note = phrase.amount > 0 ? `You have pleased the Republic: ${phrase.amount}` : `You have displeased the Republic: ${phrase.amount}`
    await updateBalance(UserId, phrase.amount, note);
  } else {
    const sentiment = checkSentiment(msg);
    await updateBalance(UserId, sentiment.score);
  }
}
