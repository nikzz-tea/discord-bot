import { Message } from 'discord.js';
import { name } from '../../config.json';
import { genString } from '../../utils';

export default async (message: Message) => {
  if (message.mentions.has(message.client.user))
    return message.reply(await genString(message.guild?.id as string));
  if (message.content == '') return;
  if (!message.content.toLowerCase().startsWith(name)) return;
  if (message.content.toLowerCase().startsWith(`${name} кто`)) return;
  message.channel.send(await genString(message.guild?.id as string));
};
