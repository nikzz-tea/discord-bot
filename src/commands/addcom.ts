import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { ICommands, Props } from '../models';

export default {
  type: CommandType.LEGACY,
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    if (name !== undefined && args.slice(1).join() === '' && message.attachments.size > 0) {
      var content = Array.from(message.attachments.values())[0].url;
    } else if (args.slice(1).join() !== '') {
      var content = args.slice(1).join(' ');
    } else {
      message.react('❎');
      return;
    }
    fs.readFile('./db/commands.json', 'utf-8', (err, data) => {
      if (err) console.log(err);
      else {
        let obj = JSON.parse(data) as ICommands;
        const guildId = guild.id.toString();
        obj[guildId].push({ [name]: content });
        const json = JSON.stringify(obj, null, 2);
        fs.writeFile('./db/commands.json', json, (err) => {
          if (err) console.log(err);
        });
        message.react('✅');
      }
    });
  },
} as CommandObject;
