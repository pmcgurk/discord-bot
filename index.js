// Import discord.js and create the client
import { Model } from 'objection';
import Knex from 'knex';
import client from './src/client';
import commands from './src/commands';
import knexConfig from './knexfile';
import checkPhrases from './src/lib/checkPhrases';

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

Model.knex(knex);

require('dotenv').config();

client.on('messageCreate', async (msg) => {
  try {
    const splitMessage = msg.content.split(' ');
    const startsWithText = splitMessage[0];
    if (startsWithText.charAt(0) === '!') {
      const calledCommand = commands[startsWithText.substring(1).toLowerCase()];
      if (calledCommand) {
        const response = await calledCommand(msg, splitMessage);
        if (response) {
          msg.reply(response);
        }
      }
    } else {
      splitMessage.map(word => checkPhrases(msg, word.toLowerCase()));
    }
  } catch (err) {
    console.log(err);
  }
});
