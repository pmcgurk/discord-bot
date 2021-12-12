import getScoreboard from '../db/getScoreboard';
import formatAmount from '../lib/formatAmount';

const scoreboard = async () => {
  const currentScoreboard = await getScoreboard();
  if (currentScoreboard) {
    const formattedScoreboard = currentScoreboard.map((user, index) => (`${index + 1}: ${user.name}: ${formatAmount(user.amount)}\n`));
    return `Here's the scoreboard as of now:

${formattedScoreboard.join('') || 'Pure empty'}
    `;
  }
  return 'FAILED, HAHAH';
};

export default scoreboard;
