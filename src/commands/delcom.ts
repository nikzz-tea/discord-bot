import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { Commands } from '../database/models';

export default {
  type: CommandType.LEGACY,
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    if (name === undefined) return;
    Commands.destroy({
      where: {
        name,
        guildId: guild.id,
      },
    });
    message.react('✅');
  },
} as CommandObject;
