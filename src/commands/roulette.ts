import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { logChannel } from '../utils';
import { timeouts } from '../config.json';

export default {
  type: CommandType.LEGACY,
  aliases: ['рулетка'],
  reply: false,
  cooldowns: {
    duration: '12 h',
    errorMessage: 'кд',
    type: 'perUserPerGuild',
  },
  callback: async ({ args, guild, message }: Props) => {
    let random = Math.random();
    for (let i = 0; timeouts.length; i++) {
      if (random < timeouts[i].chance) {
        if (!timeouts[i].hours) return { content: timeouts[i].message };
        try {
          await message.member.timeout(timeouts[i].hours * 3600000, 'проебал в рулетку');
          return { content: `${message.member.displayName} отлетает на ${timeouts[i].message}` };
        } catch (error) {
          logChannel().send('```' + error + '```');
          return message.react('🦣');
        }
      }
      random -= timeouts[i].chance;
    }
  },
} as CommandObject;
