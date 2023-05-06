import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { ICommands, Props } from '../models';

export default {
  type: CommandType.LEGACY,
  callback: ({ args, guild, message }: Props) => {
    const name = args[0];
    if (name !== undefined) {
      fs.readFile('./src/db/commands.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        else {
          let obj = JSON.parse(data) as ICommands;
          const guildId = guild.id.toString();
          obj[guildId] = obj[guildId].filter((item) => {
            item.hasOwnProperty(name);
          });
          const json = JSON.stringify(obj, null, 2);
          fs.writeFile('./src/db/commands.json', json, (err) => {
            if (err) console.log(err);
          });
          message.react('✅');
        }
      });
    } else {
      message.react('❎');
      return;
    }
  },
} as CommandObject;
