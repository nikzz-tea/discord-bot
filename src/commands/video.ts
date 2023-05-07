import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { getMessages } from '../events/messageCreate/genMessages';

export default {
  type: CommandType.LEGACY,
  aliases: ['видео'],
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    const videos = getMessages(message.guild?.id as string).filter(
      (item) => item.endsWith('.mp4') || item.endsWith('.webm'),
    );
    return {
      content: videos[Math.floor(Math.random() * videos.length)],
    };
  },
} as CommandObject;
