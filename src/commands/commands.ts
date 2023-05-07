import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { ICommands, Props } from '../models';
import { EmbedBuilder } from 'discord.js';

export default {
  type: CommandType.LEGACY,
  aliases: ['команды'],
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    try {
      const data = fs.readFileSync('./src/db/commands.json', 'utf-8');
      const obj = JSON.parse(data) as ICommands;
      const guildId = guild.id.toString();
      const commands = [];
      for (let i = 0; i < obj[guildId].length; i++) {
        commands.push(...Object.keys(obj[guildId][i]));
      }
      const emb = new EmbedBuilder()
        .setTitle('Список кастомных команд')
        .setDescription(commands.sort().join(', '))
        .setColor('Aqua');
      return {
        embeds: [emb],
      };
    } catch (err) {
      console.log(err);
    }
  },
} as CommandObject;
