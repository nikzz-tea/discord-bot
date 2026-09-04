import { CommandType } from 'wokcommands';
import { Props } from '../models';
import { count, eq } from 'drizzle-orm';
import { Messages } from '../database/schema';
import { db } from '../database';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    const result = db
      .select({ count: count() })
      .from(Messages)
      .where(eq(Messages.guildId, guild.id))
      .get();
    return {
      content: String(result?.count ?? 0),
    };
  },
};
