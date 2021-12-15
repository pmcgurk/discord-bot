import addPhrase from '../db/addPhrase';

const balance = async (msg, splitMessage) => {
  const phrase = splitMessage[1];
  const amount = splitMessage[2];
  const result = await addPhrase(msg.author.id, phrase, amount);
  if (result) {
    return `Added phrase "${phrase}"" for ${amount}`;
  }
  return 'Something broked';
};

export default balance;
