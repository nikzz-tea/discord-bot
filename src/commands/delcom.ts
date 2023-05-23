import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { Props } from '../models';

export default {
  type: CommandType.LEGACY,
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    if (name === undefined) return;
    const data = fs.readFileSync('./db/commands.json', 'utf-8');
    const obj = JSON.parse(data);
    const commands = obj[guild.id.toString()];
    delete commands[name];
    const json = JSON.stringify(obj, null, 2);
    fs.writeFileSync(`./db/commands.json`, json);
    message.react('✅');
  },
} as CommandObject;
