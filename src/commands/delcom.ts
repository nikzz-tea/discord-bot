import { and, eq } from 'drizzle-orm';
import { db } from '../database';
import { Commands } from '../database/schema';
import type { CommandObject, Props } from '../models';

export default {
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    if (name === undefined) return;

    db.delete(Commands)
      .where(and(eq(Commands.name, name), eq(Commands.guildId, guild.id)))
      .run();
    message.react('✅');
  },
} satisfies CommandObject;
