// Import discord.js and create the client
import discord from 'discord.js';

require('dotenv').config();

const { Intents } = discord;

const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

export default client;
