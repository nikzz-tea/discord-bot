import { Message } from 'discord.js';
import fs from 'fs';
import { prefix } from '../../config.json';

export default (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.startsWith(prefix)) return;
  fs.readFile('./src/db/commands.json', 'utf-8', (err, data) => {
    if (err) console.log(err);
    else {
      const commands = JSON.parse(data)[message.guild?.id.toString() as string];
      for (const command of commands) {
        const key = Object.keys(command)[0];
        if (message.content.toLowerCase() === `${prefix}${key}`) {
          message.channel.send(command[key]);
        }
      }
    }
  });
};
