import { EmbedBuilder, MessageReaction, TextChannel } from 'discord.js';
import moment from 'moment';
import { starboard } from '../../config.json';
import { Starboard } from '../../database/models';
import logChannel from '../../utils/logChannel';

export default async (reaction: MessageReaction) => {
  if (!Object.keys(starboard).includes(reaction.emoji.identifier)) return;
  if (starboard[reaction.emoji.identifier].guild != reaction.message.guild.id) return;
  if (starboard[reaction.emoji.identifier].channel == reaction.message.channel.id) return;
  let message = reaction.message;
  if (reaction.message.partial) {
    message = await reaction.message.fetch();
    reaction = await reaction.fetch();
  }
  if (reaction.count !== starboard[reaction.emoji.identifier].req) return;
  const table = await Starboard.findAll({ attributes: ['messageId'] });
  const ids = table.map((command) => command.get('messageId'));
  if (ids.includes(message.id)) return;
  const channelTo = message.client.channels.cache.get(
    starboard[reaction.emoji.identifier].channel,
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
  const finalMessage = await channelTo.send({ embeds: [emb] });
  Starboard.create({ messageId: message.id });
  Starboard.create({ messageId: finalMessage.id });
  logChannel.send(`**${reaction.message.guild.name}:**\nPosted: ${message.url}`);
};
