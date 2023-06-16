import { CommandObject, CommandType } from 'wokcommands';
import client from '..';
import { EmbedBuilder } from 'discord.js';
import { Props } from '../models';
import pidusage from 'pidusage';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    const stats = await pidusage(process.pid);
    const cpuUsage = stats.cpu;
    const embed = new EmbedBuilder()
      .setColor(message.member?.displayHexColor ?? 'Red')
      .setTitle('Stats')
      .addFields(
        { name: 'Uptime', value: `<t:${Math.round((Date.now() - client.uptime) / 1000)}:R>` },
        { name: 'Memory Usage', value: `${memoryUsage.toFixed(2)}mb` },
        { name: 'CPU Usage', value: `${cpuUsage}%` },
      );
    return {
      embeds: [embed],
    };
  },
} as CommandObject;
