import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { Props } from '../models';

export default {
  type: CommandType.LEGACY,
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    let content;
    if (name !== undefined && args.slice(1).join() === '' && message.attachments.size > 0) {
      content = Array.from(message.attachments.values())[0].url;
    } else if (args.slice(1).join() !== '') {
      content = args.slice(1).join(' ');
    } else {
      return;
    }
    const data = fs.readFileSync('./db/commands.json', 'utf-8');
    const obj = JSON.parse(data);
    const commands = obj[guild.id.toString()];
    commands[name] = commands[name] || {};
    commands[name] = content;
    const json = JSON.stringify(obj, null, 2);
    fs.writeFileSync(`./db/commands.json`, json);
    message.react('✅');
  },
} as CommandObject;
