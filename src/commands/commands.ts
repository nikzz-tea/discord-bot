import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { EmbedBuilder } from 'discord.js';
import { Commands } from '../database/models';

export default {
  type: CommandType.LEGACY,
  aliases: ['команды'],
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    const commands = await Commands.findAll({ attributes: ['name'], where: { guildId: guild.id } });
    const names = commands.map((command) => command.get('name'));
    const emb = new EmbedBuilder()
      .setTitle('Список кастомных команд')
      .setDescription(names.sort().join(', '))
      .setColor('Aqua');
    return {
      embeds: [emb],
    };
  },
} as CommandObject;
