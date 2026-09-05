import type { CommandObject, Props } from '../models';

export default {
  aliases: ['ролл'],
  callback: ({ args, message }: Props) => {
    if (!message.channel.isSendable()) return;

    let max = 100;
    if (!isNaN(Number(args[0]))) {
      max = Number(args[0]);
    }
    message.channel.send(`🎲 ${Math.floor(Math.random() * max) + 1} 🎲`);
  },
} satisfies CommandObject;
