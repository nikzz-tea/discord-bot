import { count, eq } from 'drizzle-orm';
import { Messages } from '../database/schema';
import { db } from '../database';

const getMessages = async (id: string) => {
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

export default getMessages;
