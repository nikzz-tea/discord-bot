import { Client, TextChannel } from 'discord.js';
import { eq, sql } from 'drizzle-orm';
import { db } from '../database';
import { Images } from '../database/schema';

export const getRandomImage = async (client: Client, id: string) => {
  const entry = db
    .select()
    .from(Images)
    .where(eq(Images.guildId, id))
    .orderBy(sql`random()`)
    .limit(1)
    .get();
  if (!entry) throw new Error(`No saved image for guild ${id}`);
  const { channelId, messageId, index } = entry;
  if (!channelId || !messageId || index == null) {
    throw new Error('Incomplete image record');
  }
  const channel = (await client.channels.fetch(channelId)) as TextChannel;
  const message = await channel.messages.fetch(messageId);
  const attachments = Array.from(message.attachments.values());
  return attachments[index].url;
};
