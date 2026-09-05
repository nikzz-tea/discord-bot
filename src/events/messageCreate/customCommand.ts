import { Message } from 'discord.js';
import { and, eq } from 'drizzle-orm';
import { prefix } from '../../config';
import { db } from '../../database';
import { Commands } from '../../database/schema';

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.startsWith(prefix)) return;
  const guildId = message.guildId;
  if (!guildId) return;

  const name = message.content.slice(prefix.length).split(' ')[0];
  const command = db
    .select()
    .from(Commands)
    .where(and(eq(Commands.name, name), eq(Commands.guildId, guildId)))
    .get();
  if (!command) return;
  if (!message.channel.isSendable()) return;
  if (command.content) message.channel.send(command.content);
};
