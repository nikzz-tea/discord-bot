import { SlashCommandBuilder } from 'discord.js';
import { SlashCommandObject } from '../../models';

export default {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Показывает аву')
    .addUserOption((option) => option.setName('user').setDescription('чья ава').setRequired(false))
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('серверная или общая')
        .setRequired(false)
        .setAutocomplete(true),
    ),
  autocomplete: () => ['серверная', 'общая'],
  callback: async ({ interaction }) => {
    const target = interaction.options.getUser('user') ?? interaction.user;
    const type = interaction.options.getString('type') ?? 'общая';

    let avatar: string;
    if (type === 'серверная' && interaction.inGuild()) {
      const member =
        interaction.guild?.members.cache.get(target.id) ??
        (await interaction.guild?.members.fetch(target.id));
      avatar = member?.displayAvatarURL({ size: 1024 }) ?? target.displayAvatarURL({ size: 1024 });
    } else {
      avatar = target.displayAvatarURL({ size: 1024 });
    }

    await interaction.reply({ content: avatar });
  },
} satisfies SlashCommandObject;
