import updateUserName from '../db/updateUserName';

const balance = async (msg, splitMessage) => {
  const sender = msg.author;
  const name = splitMessage.slice(1, splitMessage.length).join(' ');
  await updateUserName(sender.id, name);
  return `Changed yer name tae "${name}"`;
};

export default balance;
