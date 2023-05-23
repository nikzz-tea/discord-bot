import { Message } from 'discord.js';
import fs from 'fs';
import { prefix } from '../../config.json';

export default (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.startsWith(prefix)) return;
  const data = fs.readFileSync('./db/commands.json', 'utf-8');
  const obj = JSON.parse(data);
  const commands = obj[message.guild.id.toString()];
  const keys = Object.keys(obj[message.guild.id.toString()]);
  for (const key of keys) {
    if (message.content.toLowerCase() === `${prefix}${key.toLowerCase()}`) {
      message.channel.send(commands[key]);
    }
  }
};
