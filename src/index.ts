import { ActivityType, Client, Partials } from 'discord.js';
import dotenv from 'dotenv';
import syncSchema from './database';
import commandHandler from './handlers/commandHandler';
import eventHandler from './handlers/eventHandler';
import { vndbService } from './services/vndb.service';
import getRandomVn from './utils/getRandomVn';

dotenv.config();

const client = new Client({
  intents: 34563,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on('clientReady', async () => {
  syncSchema();
  await commandHandler(client);
  await eventHandler(client);
  const statuses = await vndbService.vnsByRating();
  client.user.setActivity(getRandomVn(statuses), { type: ActivityType.Playing });
  setInterval(
    () => {
      client.user.setActivity(getRandomVn(statuses), { type: ActivityType.Playing });
    },
    1000 * 60 * 60,
  );
  console.log(`Logged as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

export default client;
