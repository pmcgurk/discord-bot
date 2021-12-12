import formatAmount from './formatAmount';
import updateBalance from '../db/updateBalance';

const Sentiment = require('sentiment');

const sentiment = new Sentiment();

export default async function checkSentiment(msg) {
  const messageSentiment = sentiment.analyze(msg.content);
  console.log(`${msg.author} said ${msg.content}, ${formatAmount(messageSentiment.score)}!`);
  await updateBalance(msg.author.id, messageSentiment.score);
}
