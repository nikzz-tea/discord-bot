import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { ICommands, Props } from '../models';

export default {
  type: CommandType.LEGACY,
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    if (name === undefined) return;
    fs.readFile('./db/commands.json', 'utf-8', (err, data) => {
      if (err) console.log(err);
      else {
        let obj = JSON.parse(data) as ICommands;
        const guildId = guild.id.toString();
        const filtered = [] as object[];
        obj[guildId].forEach((item) => {
          if (!item.hasOwnProperty(name)) filtered.push(item);
        });
        obj[guildId] = filtered;
        const json = JSON.stringify(obj, null, 2);
        fs.writeFile('./db/commands.json', json, (err) => {
          if (err) console.log(err);
        });
        message.react('✅');
      }
    });
  },
} as CommandObject;
