import getPhrases from '../db/getPhrases';

const balance = async (msg, splitMessage) => {
  const result = await getPhrases(msg.author.id);
  if (result) {
    return result.map(phrase => `${phrase.text}: ${phrase.amount}`).join('\n');
  }
  return 'Something broked';
};

export default balance;
