import type { CommandObject, Props } from '../models';
import { getMessages } from '../utils';

export default {
  aliases: ['видео'],
  callback: async ({ guild, message }: Props) => {
    if (!message.channel.isSendable()) return;

    const videos = await getMessages(guild.id);
    const filtered = videos.filter((item) => item.endsWith('.mp4') || item.endsWith('.webm'));
    const video = filtered[Math.floor(Math.random() * filtered.length)];

    if (video) message.channel.send(video);
  },
} satisfies CommandObject;
