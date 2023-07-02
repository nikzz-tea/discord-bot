import { ApplicationCommandOptionType } from 'discord.js';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';

export default {
  type: CommandType.SLASH,
  description: 'Показывает аву',
  options: [
    {
      name: 'user',
      description: 'чья ава',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  callback: ({ args, member, guild }: CommandUsage) => {
    const user = guild.members.cache.get(args[0] || member.id);
    return {
      content: user.displayAvatarURL({ size: 512 }),
    };
  },
} as CommandObject;
