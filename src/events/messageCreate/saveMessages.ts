import { Message } from 'discord.js';
import { name, prefix, saveFromChannels, genPerMessage } from '../../config.json';
import { genString } from '../../utils';
import { Images, Messages } from '../../database/models';

let count = 0;

export default async (message: Message) => {
  if (message.content.startsWith(prefix)) return;
  if (message.content.startsWith(name)) return;
  if (message.content.startsWith(`${name} кто`)) return;
  if (message.author.bot) return;
  if (!saveFromChannels.includes(message.channel.id)) return;
  count++;
  count % genPerMessage === 0 &&
    message.channel.send(await genString(message.guild?.id as string, 10));
  const pushItem = (type: string) => {
    type === 'messages'
      ? Messages.create({ message: message.content, guildId: message.guildId })
      : Images.create({
          image: Array.from(message.attachments.values())[0].url,
          guildId: message.guildId,
        });
  };
  if (message.content != '') pushItem('messages');
  if (message.attachments.size > 0) pushItem('images');
};
