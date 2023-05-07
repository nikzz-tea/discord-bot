import { EmbedBuilder, Message, MessageReaction, TextChannel } from 'discord.js';
import moment from 'moment';
import fs from 'fs';
import { platinaEmotes, platinaChannels } from '../../config.json';

export default async (reaction: MessageReaction) => {
  if (!platinaEmotes.includes(reaction.emoji.identifier)) return;
  if (platinaChannels.includes(reaction.message.channel.id)) return;
  let channelTo;
  let req;
  let message = reaction.message;
  if (reaction.message.partial) {
    message = await reaction.message.fetch();
    reaction = await reaction.fetch();
  }
  switch (reaction.emoji.identifier) {
    case 'uruesami3060:954475744401162260':
      req = 4;
      channelTo = '967837802983194625';
      break;
    case 'chuunibyou:1057564333233676338':
      req = 6;
      channelTo = '1093112656195485746';
      break;
    case 'eblan:1095739894619447337':
      req = 6;
      channelTo = '1095734091107803146';
      break;
    case 'Jokerge:1091480491955335179':
    default:
      req = 1;
      channelTo = '829357606224134174';
      break;
  }
  if (reaction.count !== req) return;
  const data = fs.readFileSync('./src/db/platina.json', 'utf-8');
  const ids = JSON.parse(data) as number[];
  if (ids.includes(Number(message.id))) return;
  ids.push(Number(message.id));
  const json = JSON.stringify(ids, null, 2);
  channelTo = message.client.channels.cache.get(channelTo) as TextChannel;
  const channelFrom = message.channel as TextChannel;
  const timestamp = moment(message.createdAt).format('DD[.]MM[.]YY');
  const emb = new EmbedBuilder()
    .setColor(message.member?.displayHexColor ?? 'Aqua')
    .setAuthor({
      name: message.author ? message.author?.tag : '',
      iconURL: message.author?.displayAvatarURL(),
      url: message.url,
    })
    .setFooter({ text: `${timestamp} • #${channelFrom.name}` });
  if (message.attachments.size > 0) {
    emb.setImage(Array.from(message.attachments.values())[0].url);
  }
  if (message.content != '') {
    emb.setDescription(message.content);
  }
  channelTo.send({ embeds: [emb] });
  fs.writeFileSync('./src/db/platina.json', json);
};
