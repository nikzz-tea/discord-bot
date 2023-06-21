import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { logChannel } from '../utils';

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
    if (message.member.id === '441628048970743809') return message.react('🦣');
    if (Math.floor(Math.random() * 6) + 1 === 6) {
      const hour = 1000 * 60 * 60;
      const timeouts = [hour * 6, hour * 12, hour * 24];
      const timeoutPhrases = ['6 часов', '12 часов', '**сутки**'];
      const index = Math.floor(Math.random() * 3) + 1;
      try {
        await message.member.timeout(timeouts[index], 'проебал в рулетку');
        return { content: `${message.member.displayName} отлетает на ${timeoutPhrases[index]}` };
      } catch (error) {
        logChannel().send('```' + error + '```');
        return message.react('🦣');
      }
    }
    return { content: 'повезло тебе' };
  },
} as CommandObject;
