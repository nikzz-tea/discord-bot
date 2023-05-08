import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { Props } from '../models';
import { getGuildName } from '../utils';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    const guildName = getGuildName(guild.id);
    const data = fs.readFileSync(`./db/messages.${guildName}.json`, 'utf-8');
    const obj = JSON.parse(data);
    return {
      content: obj.length.toString(),
    };
  },
} as CommandObject;
