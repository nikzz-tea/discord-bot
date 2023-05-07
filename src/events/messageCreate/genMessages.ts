import { Message } from 'discord.js';
import MarkovGen from 'markov-generator';
import fs from 'fs';
import { name } from '../../config.json';
import { getGuildName } from './saveMessages';

export const genString = (id: string) => {
  const guildName = getGuildName(id);
  const data = fs.readFileSync(`./src/db/messages.${guildName}.json`, 'utf-8');
  const obj = JSON.parse(data);
  const max = obj.length;
  const start = Math.floor(Math.random() * max - 1000) + 1;
  const end = start + 1000;
  const messages = obj.list.slice(start, end);
  const markov = new MarkovGen({ input: messages, minLength: 1 });
  return markov.makeChain();
};

export default (message: Message) => {
  if (message.mentions.has(message.client.user))
    message.reply(genString(message.guild?.id as string));
  if (!message.content.startsWith(name)) return;
  if (message.content.startsWith(`${name} кто`)) return;
  if (message.content.startsWith(name) && !message.mentions.has(message.client.user))
    message.channel.send(genString(message.guild?.id as string));
};
