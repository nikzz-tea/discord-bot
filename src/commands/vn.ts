import { CommandObject, Props } from '../models';
import { EmbedBuilder } from 'discord.js';
import { vndbService } from '../services/vndb.service';
import formatHyperlinks from '../utils/formatHyperlinks';

export default {
  aliases: ['вн'],
  callback: async ({ args, message }: Props) => {
    if (!args.length) return message.react('❌');
    if (!message.channel.isSendable()) return;
    try {
      const data = await vndbService.getVn(args.join(' '));
      const rating = (data.rating / 10).toFixed(2).toString();
      const hours = Math.floor(data.length_minutes / 60);
      const minutes = data.length_minutes % 60;
      const playtime = `${hours}h ${minutes}m`;
      const emb = new EmbedBuilder()
        .setAuthor({ name: data.title, url: `https://vndb.org/${data.id}` })
        .setColor(message.member?.displayHexColor ?? 'Orange')
        .setDescription(formatHyperlinks(data.description.slice(0, data.description.indexOf('\n'))))
        .setThumbnail(data.image.url)
        .addFields([
          { name: 'Play time', value: playtime, inline: true },
          { name: 'Rating', value: rating, inline: true },
        ]);
      message.channel.send({ embeds: [emb] });
    } catch (error) {
      return message.react('❌');
    }
  },
} satisfies CommandObject;
