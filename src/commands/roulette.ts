import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';

export default {
  type: CommandType.LEGACY,
  aliases: ['рулетка'],
  reply: false,
  cooldowns: {
    duration: '1 h',
    errorMessage: 'кд',
    type: 'perUserPerGuild',
  },
  callback: async ({ args, guild, message }: Props) => {
    if (Math.floor(Math.random() * 6) + 1 === 6) {
      try {
        await message.member.timeout(1000 * 60 * 60, 'проебал в рулетку');
        return { content: `${message.member.displayName} отлетает на час` };
      } catch (error) {
        return;
      }
    }
    return { content: 'повезло тебе' };
  },
} as CommandObject;
