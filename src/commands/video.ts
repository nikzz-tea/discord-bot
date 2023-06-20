import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { getMessages } from '../utils';

export default {
  type: CommandType.LEGACY,
  aliases: ['видео'],
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    const videos = await getMessages(guild.id);
    const filtered = videos.filter((item) => item.endsWith('.mp4') || item.endsWith('.webm'));
    return {
      content: filtered[Math.floor(Math.random() * filtered.length)],
    };
  },
} as CommandObject;
