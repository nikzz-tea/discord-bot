import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { Commands } from '../database/models';

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
    Commands.upsert({
      name,
      content,
      guildId: guild.id,
    });
    message.react('✅');
  },
} as CommandObject;
