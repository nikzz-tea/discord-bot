import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { EmbedBuilder } from 'discord.js';
import { vndbService } from '../services/vndb.service';

export default {
  type: CommandType.LEGACY,
  aliases: ['вн'],
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    if (!args.length) return message.react('❌');
    try {
      const data = await vndbService.getVn(args.join(' '));
      const description = data.description.slice(0, data.description.indexOf('\n'));
      const rating = (data.rating / 10).toFixed(2).toString();
      const hours = Math.floor(data.length_minutes / 60);
      const minutes = data.length_minutes % 60;
      const playtime = `${hours}h ${minutes}m`;
      const emb = new EmbedBuilder()
        .setAuthor({ name: data.title, url: `https://vndb.org/${data.id}` })
        .setColor(message.member?.displayHexColor ?? 'Orange')
        .setDescription(description)
        .setThumbnail(data.image.url)
        .addFields([
          { name: 'Play time', value: playtime, inline: true },
          { name: 'Rating', value: rating, inline: true },
        ]);
      return {
        embeds: [emb],
      };
    } catch (error) {
      return message.react('❌');
    }
  },
} as CommandObject;
