import { CommandObject, CommandType } from 'wokcommands';
import { APIEmbedField, EmbedBuilder, RestOrArray } from 'discord.js';
import { PM2Stats, Props } from '../models';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ownerId } from '../config.json';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    const { stdout, stderr } = await promisify(exec)('pm2 jlist');
    if (stderr) return message.react('❌');
    const list: PM2Stats[] = JSON.parse(stdout);
    const buildEmbed = (processes: PM2Stats[]) => {
      const embed = new EmbedBuilder().setColor(message.member.displayHexColor).setTitle('Stats');
      const fields: RestOrArray<APIEmbedField> = processes.map((process) => {
        const { name, monit, pm2_env } = process;
        const memory = (monit.memory / 1024 / 1024).toFixed(2);
        const timestamp = Math.round(pm2_env.pm_uptime / 1000);
        return {
          name: name,
          value: `**CPU:** ${monit.cpu}% • **RAM:** ${memory}mb\nUptime: <t:${timestamp}:R>`,
          inline: false,
        };
      });
      embed.addFields(fields);
      return embed;
    };
    if (message.author.id !== ownerId) {
      const process = list.find((item) => item.name === 'zakuro');
      if (!process) return message.react('❌');
      return message.channel.send({ embeds: [buildEmbed([process])] });
    }
    if (!args.length) return message.channel.send({ embeds: [buildEmbed(list)] });
    const process = list.find((item) => item.name === args[0]);
    if (!process) return message.react('❌');
    message.channel.send({ embeds: [buildEmbed([process])] });
  },
} as CommandObject;
