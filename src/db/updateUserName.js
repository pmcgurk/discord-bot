import User from '../models/user';

export default async function setUserName(UserId, name) {
  await User.query().patchAndFetchById(UserId, { name });
  return true;
}
