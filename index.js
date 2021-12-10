// Import discord.js and create the client
const Discord = require('discord.js');
require('dotenv').config()

const { Client, Intents } = require('discord.js');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

// Register an event to handle incoming messages
client.on('messageCreate', async msg => {
  // Check if the message starts with '!hello' and respond with 'world!' if it does.
  if (msg.content.startsWith("!hello")) {
    msg.reply("world!")
  }
})

client.login(process.env.TOKEN);