import { ActivityType, Client, Partials } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: 34563,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on('ready', () => {
  new WOKCommands({
    client,
    commandsDir: path.join(__dirname, 'commands'),
    events: { dir: path.join(__dirname, 'events') },
  });
  console.log(`Logged as ${client.user?.tag}`);
  client.user?.setActivity('Subarashiki Hibi ~Furenzoku Sonzai~', { type: ActivityType.Playing });
});

client.on('messageReactionAdd', (r) => {
  r.message.fetch().then((fullMessage) => {
    console.log(`${r.emoji.name} set on ${fullMessage.content}`);
  });
});

client.login(process.env.TOKEN);
