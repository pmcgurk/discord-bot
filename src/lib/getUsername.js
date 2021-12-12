import client from '../client';

async function getUsername(UserId) {
  const user = client.users.cache.find(curUser => curUser.id === UserId);
  return user;
}

export default getUsername;
