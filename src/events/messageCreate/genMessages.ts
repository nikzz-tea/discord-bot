import { Message } from 'discord.js';
import { name } from '../../config.json';
import genString from '../../utils/genString';

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (message.mentions.has(message.client.user))
    return message.reply(await genString(message.guild?.id as string, 3));
  if (message.content == '' || !message.content) return;
  if (!message.content.toLowerCase().startsWith(name)) return;
  if (message.content.toLowerCase().startsWith(`${name} кто`)) return;
  message.channel.sendTyping();
  message.channel.send(await genString(message.guild?.id as string, 3));
};
