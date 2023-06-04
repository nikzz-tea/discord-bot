import { EmbedBuilder, MessageReaction, TextChannel } from 'discord.js';
import moment from 'moment';
import fs from 'fs';
import { platina } from '../../config.json';
import { logChannel } from '../../utils';

export default async (reaction: MessageReaction) => {
  if (!Object.keys(platina).includes(reaction.emoji.identifier)) return;
  if (platina[reaction.emoji.identifier].guild != reaction.message.guild.id) return;
  if (platina[reaction.emoji.identifier].channel == reaction.message.channel.id) return;
  let message = reaction.message;
  if (reaction.message.partial) {
    message = await reaction.message.fetch();
    reaction = await reaction.fetch();
  }
  if (reaction.count !== platina[reaction.emoji.identifier].req) return;
  const data = fs.readFileSync('./db/platina.json', 'utf-8');
  const ids = JSON.parse(data) as number[];
  if (ids.includes(Number(message.id))) return;
  ids.push(Number(message.id));
  const json = JSON.stringify(ids, null, 2);
  const channelTo = message.client.channels.cache.get(
    platina[reaction.emoji.identifier].channel,
  ) as TextChannel;
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
  if (message.embeds.length > 0) {
    message.embeds[0].data.url && emb.setImage(message.embeds[0].data.url);
  }
  if (message.attachments.size > 0) {
    emb.setImage(Array.from(message.attachments.values())[0].url);
  }
  if (message.content != '') {
    emb.setDescription(message.content);
  }
  channelTo.send({ embeds: [emb] });
  fs.writeFileSync('./db/platina.json', json);
  logChannel().send(`**${reaction.message.guild.name}:**\nPosted: ${message.url}`);
};
