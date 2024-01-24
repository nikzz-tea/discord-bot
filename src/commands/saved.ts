import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { Messages } from '../database/models';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    const count = await Messages.count({ where: { guildId: guild.id } });
    return {
      content: count.toString(),
    };
  },
} as CommandObject;
