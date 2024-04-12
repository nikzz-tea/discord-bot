import { ActivityType, Client, Partials } from 'discord.js';
import WOKCommands, { DefaultCommands } from 'wokcommands';
import path from 'path';
import dotenv from 'dotenv';
import { vndbService } from './services/vndb.service';
import sequelize from './database';
import getRandomVn from './utils/getRandomVn';
import OpenAI from 'openai';

dotenv.config();

const client = new Client({
  intents: 34563,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

client.on('ready', async () => {
  await sequelize.sync();
  new WOKCommands({
    client,
    commandsDir: path.join(__dirname, 'commands'),
    events: { dir: path.join(__dirname, 'events') },
    disabledDefaultCommands: [
      DefaultCommands.ChannelCommand,
      DefaultCommands.CustomCommand,
      DefaultCommands.Prefix,
      DefaultCommands.RequiredPermissions,
      DefaultCommands.RequiredRoles,
      DefaultCommands.ToggleCommand,
    ],
  });
  const statuses = await vndbService.vnsByRating();
  client.user.setActivity(getRandomVn(statuses), { type: ActivityType.Playing });
  setInterval(() => {
    client.user.setActivity(getRandomVn(statuses), { type: ActivityType.Playing });
  }, 1000 * 60 * 60);
  console.log(`Logged as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

export default client;
