import { EmbedBuilder } from 'discord.js';
import { eq } from 'drizzle-orm';
import { db } from '../database';
import { Commands } from '../database/schema';
import type { CommandObject, Props } from '../models';

export default {
  aliases: ['команды'],
  callback: ({ guild, message }: Props) => {
    if (!message.channel.isSendable()) return;

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

    message.channel.send({ embeds: [emb] });
  },
} satisfies CommandObject;
