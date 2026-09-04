import { searchVideo } from 'usetube';
import { CommandObject, Props } from '../models';

export default {
  aliases: ['yt'],
  callback: ({ args, message }: Props) => {
    if (!args.length) return message.react('❌');
    const keywords = args.join(' ');
    searchVideo(keywords).then((res) => {
      try {
        if (!message.channel.isSendable()) return;
        message.channel.send(`https://youtu.be/${res.videos[0].id}`);
      } catch (error) {
        return message.react('❌');
      }
    });
  },
} satisfies CommandObject;
