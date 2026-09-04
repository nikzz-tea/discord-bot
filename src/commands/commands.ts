import { CommandType } from 'wokcommands';
import { Props } from '../models';
import { EmbedBuilder } from 'discord.js';
import { eq } from 'drizzle-orm';
import { Commands } from '../database/schema';
import { db } from '../database';

export default {
  type: CommandType.LEGACY,
  aliases: ['команды'],
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    const commands = db
      .select({ name: Commands.name })
      .from(Commands)
      .where(eq(Commands.guildId, guild.id))
      .all();
    const names = commands.map((command) => command.name);
    const emb = new EmbedBuilder()
      .setTitle('Список кастомных команд')
      .setDescription(names.sort().join(', '))
      .setColor('Aqua');
    return {
      embeds: [emb],
    };
  },
};
