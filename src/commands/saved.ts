import { CommandObject, Props } from '../models';
import { count, eq } from 'drizzle-orm';
import { Messages } from '../database/schema';
import { db } from '../database';

export default {
  callback: ({ guild, message }: Props) => {
    if (!message.channel.isSendable()) return;
    const result = db
      .select({ count: count() })
      .from(Messages)
      .where(eq(Messages.guildId, guild.id))
      .get();
    message.channel.send(String(result?.count ?? 0));
  },
} satisfies CommandObject;
