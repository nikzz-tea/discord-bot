import { searchVideo } from 'usetube';
import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';

export default {
  type: CommandType.LEGACY,
  aliases: ['yt'],
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    if (!args.length) return message.react('❌');
    const keywords = args.join(' ');
    searchVideo(keywords).then((res) => {
      try {
        message.channel.send(`https://youtu.be/${res.videos[0].id}`);
      } catch (error) {
        return message.react('❌');
      }
    });
  },
} as CommandObject;
