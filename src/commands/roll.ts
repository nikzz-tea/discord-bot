import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';

export default {
  type: CommandType.LEGACY,
  aliases: ['ролл'],
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    let max = 100;
    if (!isNaN(Number(args[0]))) {
      max = Number(args[0]);
    }
    return {
      content: `🎲 ${Math.floor(Math.random() * max) + 1} 🎲`,
    };
  },
} as CommandObject;
