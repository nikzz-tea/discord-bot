import { CommandObject, Props } from '../models';
import { vndbService } from '../services/vndb.service';
import { EmbedBuilder } from 'discord.js';
import formatHyperlinks from '../utils/formatHyperlinks';

export default {
  aliases: ['char'],
  callback: async ({ args, message }: Props) => {
    if (!args.length) return message.react('❌');
    if (!message.channel.isSendable()) return;
    try {
      const data = await vndbService.getChar(args.join(' '));
      const description = formatHyperlinks(
        data.description.slice(0, data.description.indexOf('\n')),
      );
      const from = `[${data.vns[0].title}](https://vndb.org/${data.vns[0].id})`;
      const gender =
        data.sex[0] === 'f' ? ':female_sign:' : data.sex[0] === 'm' ? ':male_sign:' : '❓';
      const emb = new EmbedBuilder()
        .setTitle(data.name)
        .setURL(`https://vndb.org/${data.id}`)
        .setColor(message.member?.displayHexColor ?? 'Orange')
        .setThumbnail(data.image.url)
        .setDescription(description)
        .addFields([
          ...(data.vns ? [{ name: 'From', value: from }] : []),
          ...(data.age ? [{ name: 'Age', value: data.age.toString(), inline: true }] : []),
          ...(data.sex ? [{ name: 'Sex', value: gender, inline: true }] : []),
          ...(data.weight ? [{ name: 'Weight', value: data.weight.toString(), inline: true }] : []),
          ...(data.height ? [{ name: 'Height', value: data.height.toString(), inline: true }] : []),
          ...(data.cup ? [{ name: 'Cup', value: data.cup.toString(), inline: true }] : []),
          ...(data.bust ? [{ name: 'Bust', value: data.bust.toString(), inline: true }] : []),
          ...(data.waist ? [{ name: 'Waist', value: data.waist.toString(), inline: true }] : []),
          ...(data.hips ? [{ name: 'Hips', value: data.hips.toString(), inline: true }] : []),
        ]);
      message.channel.send({ embeds: [emb] });
    } catch (error) {
      console.log(error);
      return message.react('❌');
    }
  },
} satisfies CommandObject;
