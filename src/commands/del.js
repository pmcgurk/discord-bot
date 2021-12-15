import deletePhrase from '../db/deletePhrase';

const balance = async (msg, splitMessage) => {
  const phrase = splitMessage[1];
  const result = await deletePhrase(msg.author.id, phrase);
  if (result) {
    return `Deleted phrase "${phrase}"`;
  }
  return 'Something broked';
};

export default balance;
