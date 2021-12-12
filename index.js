// Import discord.js and create the client
import { Model } from 'objection';
import Knex from 'knex';
import client from './src/client';
import commands from './src/commands';
import knexConfig from './knexfile';
import checkPhrases from './src/lib/checkPhrases';
import checkSentiment from './src/lib/checkSentiment';

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

Model.knex(knex);

require('dotenv').config();

const silent = process.env.SILENT;

client.on('messageCreate', async (msg) => {
  try {
    if (msg.author.id !== '918900485484851251') {
      const splitMessage = msg.content.split(' ');
      const startsWithText = splitMessage[0];
      if (startsWithText.charAt(0) === '!') {
        const calledCommand = commands[startsWithText.substring(1).toLowerCase()];
        if (calledCommand) {
          const response = await calledCommand(msg, splitMessage);
          if (response && !silent) {
            msg.reply(response);
          }
          if (silent) {
            console.log(`SILENT MODE: ${response}`);
          }
        }
      } else {
        splitMessage.map(async word => checkPhrases(msg, word.toLowerCase()));
        await checkSentiment(msg);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
