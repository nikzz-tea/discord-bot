import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { vndbService } from '../services/vndb.service';
import { EmbedBuilder } from 'discord.js';

const replaceLinks = (input: string) => {
  const pattern = /\[url=([^\]]+)\]([^\[]+)\[\/url\]/g;
  const replacement = (match: string, url: string, label: string) => {
    const absoluteUrl = url.startsWith('/') ? `https://vndb.org${url}` : url;
    return `[${label}](${absoluteUrl})`;
  };
  return input.replace(pattern, replacement);
};

export default {
  type: CommandType.LEGACY,
  aliases: ['char'],
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    if (!args.length) return message.react('❌');
    try {
      const data = await vndbService.getChar(args.join(' '));
      const emb = new EmbedBuilder()
        .setTitle(data.name)
        .setURL(`https://vndb.org/${data.id}`)
        .setColor(message.member?.displayHexColor ?? 'Orange')
        .setThumbnail(data.image.url)
        .setDescription(replaceLinks(data.description.slice(0, data.description.indexOf('\n'))))
        .addFields([
          ...(data.vns
            ? [
                {
                  name: 'From',
                  value: `[${data.vns[0].title}](https://vndb.org/${data.vns[0].id})`,
                },
              ]
            : []),
          ...(data.age ? [{ name: 'Age', value: data.age.toString(), inline: true }] : []),
          ...(data.sex
            ? [
                {
                  name: 'Sex',
                  value:
                    data.sex[0] === 'f'
                      ? ':female_sign:'
                      : data.sex[0] === 'm'
                      ? ':male_sign:'
                      : '❓',
                  inline: true,
                },
              ]
            : []),
          ...(data.weight ? [{ name: 'Weight', value: data.weight.toString(), inline: true }] : []),
          ...(data.height ? [{ name: 'Height', value: data.height.toString(), inline: true }] : []),
          ...(data.cup ? [{ name: 'Cup', value: data.cup.toString(), inline: true }] : []),
          ...(data.bust ? [{ name: 'Bust', value: data.bust.toString(), inline: true }] : []),
          ...(data.waist ? [{ name: 'Waist', value: data.waist.toString(), inline: true }] : []),
          ...(data.hips ? [{ name: 'Hips', value: data.hips.toString(), inline: true }] : []),
        ]);
      return {
        embeds: [emb],
      };
    } catch (error) {
      console.log(error);
      return message.react('❌');
    }
  },
} as CommandObject;
