import { CommandType } from 'wokcommands';
import { Props } from '../models';
import { Commands } from '../database/schema';
import { db } from '../database';

export default {
  type: CommandType.LEGACY,
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    let content: string;
    if (name !== undefined && args.slice(1).join() === '' && message.attachments.size > 0) {
      content = Array.from(message.attachments.values())[0].url;
    } else if (args.slice(1).join() !== '') {
      content = args.slice(1).join(' ');
    } else {
      return;
    }
    db.insert(Commands)
      .values({ name, content, guildId: guild.id })
      .onConflictDoUpdate({
        target: [Commands.name, Commands.guildId],
        set: { content },
      })
      .run();
    message.react('✅');
  },
};
