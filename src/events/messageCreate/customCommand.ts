import { Message } from 'discord.js';
import { prefix } from '../../config.json';
import { and, eq } from 'drizzle-orm';
import { Commands } from '../../database/schema';
import { db } from '../../database';

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.startsWith(prefix)) return;
  const name = message.content.slice(prefix.length).split(' ')[0];
  const command = db
    .select()
    .from(Commands)
    .where(and(eq(Commands.name, name), eq(Commands.guildId, message.guildId)))
    .get();
  if (!command) return;
  if (!message.channel.isSendable()) return;
  message.channel.send(command.content);
};
