import getUser from './getUser';

export default async function getBalance(userId) {
  const sender = await getUser(userId);
  return sender.amount;
}
