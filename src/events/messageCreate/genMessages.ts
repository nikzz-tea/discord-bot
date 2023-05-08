import { Message } from 'discord.js';
import { name } from '../../config.json';
import { genString } from '../../utils';

export default (message: Message) => {
  if (message.mentions.has(message.client.user))
    message.reply(genString(message.guild?.id as string));
  if (!message.content.startsWith(name)) return;
  if (message.content.startsWith(`${name} кто`)) return;
  if (message.content.startsWith(name) && !message.mentions.has(message.client.user))
    message.channel.send(genString(message.guild?.id as string));
};
