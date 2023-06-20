import { ActivityType, Client, Partials } from 'discord.js';
import WOKCommands, { DefaultCommands } from 'wokcommands';
import path from 'path';
import dotenv from 'dotenv';
import { vndbService } from './services/vndb.service';
import { Commands, Images, Messages, Platina } from './database/models';
import sequelize from './database';

dotenv.config();

const client = new Client({
  intents: 34563,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once('ready', async () => {
  sequelize.sync();
});

client.on('ready', () => {
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
  console.log(`Logged as ${client.user?.tag}`);
  vndbService.vnsByRating().then((statuses) => {
    client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], {
      type: ActivityType.Playing,
    });
    setInterval(() => {
      client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], {
        type: ActivityType.Playing,
      });
    }, 1000 * 60 * 60);
  });
});

export default client;

client.login(process.env.TOKEN);
