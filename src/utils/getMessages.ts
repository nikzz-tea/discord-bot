import { count, eq } from 'drizzle-orm';
import { db } from '../database';
import { Messages } from '../database/schema';

export const getMessages = async (id: string) => {
  const result = db.select({ count: count() }).from(Messages).where(eq(Messages.guildId, id)).get();
  const max = result?.count ?? 0;
  const limit = 500;
  const start = Math.floor(Math.random() * max - limit) + 1;
  const rows = db
    .select({ message: Messages.message })
    .from(Messages)
    .where(eq(Messages.guildId, id))
    .limit(limit)
    .offset(start)
    .all();
  return rows.map((row) => row.message) as string[];
};
