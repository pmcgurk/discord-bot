import editPhrase from '../db/editPhrase';

const balance = async (msg, splitMessage) => {
  const phrase = splitMessage[1];
  const amount = splitMessage[2];
  const result = await editPhrase(msg.author.id, phrase, amount);
  if (result) {
    return `Edited phrase "${phrase}" to ${amount}`;
  }
  return 'Something broked';
};

export default balance;
