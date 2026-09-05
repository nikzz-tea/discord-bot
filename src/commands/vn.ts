import { EmbedBuilder } from 'discord.js';
import type { CommandObject, Props } from '../models';
import { vndbService } from '../services/vndb.service';
import { formatHyperlinks } from '../utils';

export default {
  aliases: ['вн'],
  callback: async ({ args, message }: Props) => {
    if (!args.length) return message.react('❌');
    if (!message.channel.isSendable()) return;

    const data = await vndbService.getVn(args.join(' '));
    if (!data) return message.react('❌');
    const rating = data.rating != null ? (data.rating / 10).toFixed(2) : 'N/A';
    const lengthMinutes = data.length_minutes;
    const hours = lengthMinutes != null ? Math.floor(lengthMinutes / 60) : 0;
    const minutes = lengthMinutes != null ? lengthMinutes % 60 : 0;
    const playtime = lengthMinutes != null ? `${hours}h ${minutes}m` : 'N/A';
    const description = data.description
      ? formatHyperlinks(data.description.slice(0, data.description.indexOf('\n')))
      : null;
    const emb = new EmbedBuilder()
      .setAuthor({ name: data.title, url: `https://vndb.org/${data.id}` })
      .setColor(message.member?.displayHexColor ?? 'Orange')
      .setDescription(description)
      .setThumbnail(data.image?.url ?? null)
      .addFields([
        { name: 'Play time', value: playtime, inline: true },
        { name: 'Rating', value: rating, inline: true },
      ]);

    message.channel.send({ embeds: [emb] });
  },
} satisfies CommandObject;
