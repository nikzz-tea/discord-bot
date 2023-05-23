import { CommandObject, CommandType } from 'wokcommands';
import fs from 'fs';
import { Props } from '../models';
import { EmbedBuilder } from 'discord.js';

export default {
  type: CommandType.LEGACY,
  aliases: ['команды'],
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    const data = fs.readFileSync('./db/commands.json', 'utf-8');
    const obj = JSON.parse(data);
    const commands = Object.keys(obj[guild.id.toString()]);
    const emb = new EmbedBuilder()
      .setTitle('Список кастомных команд')
      .setDescription(commands.sort().join(', '))
      .setColor('Aqua');
    return {
      embeds: [emb],
    };
  },
} as CommandObject;
