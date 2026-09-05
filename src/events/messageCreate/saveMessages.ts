import { Message } from 'discord.js';
import { genPerMessage, name, prefix, saveFromChannels } from '../../config';
import { db } from '../../database';
import { Images, Messages } from '../../database/schema';
import { genString } from '../../utils';

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
    message.channel.isSendable() &&
    message.channel.send(await genString(message.guild?.id as string, 10));
  const pushItem = (type: string) => {
    if (type === 'messages') {
      const { content } = message;
      if (content.startsWith('||') && content.endsWith('||')) return;
      db.insert(Messages)
        .values({
          message: message.content.replace(/\|\|.*?\|\|/g, ''),
          guildId: message.guildId,
        })
        .run();
    }
    if (type === 'images') {
      const attachments = Array.from(message.attachments.values());
      attachments.forEach(({ spoiler, contentType }, index) => {
        if (spoiler) return;
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') return;
        db.insert(Images)
          .values({
            channelId: message.channelId,
            messageId: message.id,
            index,
            guildId: message.guildId,
          })
          .run();
      });
    }
  };
  if (message.content != '') pushItem('messages');
  if (message.attachments.size > 0) pushItem('images');
};
