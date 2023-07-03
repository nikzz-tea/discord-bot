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
    {
      name: 'type',
      description: 'серверная или общая',
      type: ApplicationCommandOptionType.String,
      required: false,
      autocomplete: true,
    },
  ],
  autocomplete: () => ['серверная', 'общая'],
  callback: ({ interaction, member, guild }: CommandUsage) => {
    const user = guild.members.cache.get(interaction.options.getUser('user')?.id || member.id);
    const type = interaction.options.get('type')?.value || 'общая';
    const avatar =
      type === 'серверная'
        ? user.displayAvatarURL({ size: 1024 })
        : user.user.displayAvatarURL({ size: 1024 });
    return avatar;
  },
} as CommandObject;
