import { Message } from 'discord.js';
import { name, prefix, saveFromChannels, genPerMessage } from '../../config.json';
import { Images, Messages } from '../../database/models';
import genString from '../../utils/genString';

let count = 0;

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!saveFromChannels.includes(message.channel.id)) return;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) return;
  if (message.content.startsWith(name)) return;
  if (message.content.startsWith(`${name} кто`)) return;
  count++;
  count % genPerMessage === 0 &&
    message.channel.send(await genString(message.guild?.id as string, 10));
  const pushItem = (type: string) => {
    if (type === 'messages') {
      const { content } = message;
      if (content.startsWith('||') && content.endsWith('||')) return;
      Messages.create({
        message: message.content.replace(/\|\|.*?\|\|/g, ''),
        guildId: message.guildId,
      });
    }
    if (type === 'images') {
      const attachments = Array.from(message.attachments.values());
      attachments.forEach((attach, index) => {
        if (attach.spoiler) return;
        Images.create({
          channelId: message.channelId,
          messageId: message.id,
          index,
          guildId: message.guildId,
        });
      });
    }
  };
  if (message.content != '') pushItem('messages');
  if (message.attachments.size > 0) pushItem('images');
};
