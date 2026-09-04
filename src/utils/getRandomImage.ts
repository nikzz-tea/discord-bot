import { Client, TextChannel } from 'discord.js';
import { eq, sql } from 'drizzle-orm';
import { Images } from '../database/schema';
import { db } from '../database';

const getRandomImage = async (client: Client, id: string) => {
  const entry = db
    .select()
    .from(Images)
    .where(eq(Images.guildId, id))
    .orderBy(sql`random()`)
    .limit(1)
    .get();
  const channel = (await client.channels.fetch(entry.channelId)) as TextChannel;
  const message = await channel.messages.fetch(entry.messageId);
  const attachments = Array.from(message.attachments.values());
  return attachments[entry.index].url;
};

export default getRandomImage;
