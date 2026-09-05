import { searchVideo } from 'usetube';
import { CommandObject, Props } from '../models';

export default {
  aliases: ['yt'],
  callback: async ({ args, message }: Props) => {
    if (!message.channel.isSendable()) return;
    if (!args.length) return message.react('❌');
    const res = await searchVideo(args.join(' '))
    if (!res.videos.length) return message.react('❌');
    message.channel.send(`https://youtu.be/${res.videos[0].id}`);
  },
} satisfies CommandObject;
