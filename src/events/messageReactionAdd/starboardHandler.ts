import { EmbedBuilder, MessageReaction, TextChannel } from 'discord.js';
import { starboard } from '../../config';
import { db } from '../../database';
import { Starboard } from '../../database/schema';
import { logger } from '../../utils';

export default async (reaction: MessageReaction) => {
  const config = starboard[reaction.emoji.identifier];
  if (!config) return;
  const guildId = reaction.message.guildId;
  if (!guildId || config.guild !== guildId) return;
  if (config.channel == reaction.message.channel.id) return;

  let message = reaction.message;
  if (reaction.message.partial) {
    message = await reaction.message.fetch();
    reaction = await reaction.fetch();
  }
  if (reaction.count !== config.req) return;
  const ids = db
    .select({ messageId: Starboard.messageId })
    .from(Starboard)
    .all()
    .map((entry) => entry.messageId);
  if (ids.includes(message.id)) return;
  const channelTo = message.client.channels.cache.get(config.channel) as TextChannel;
  const channelFrom = message.channel as TextChannel;
  const timestamp = message.createdAt.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
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
  db.insert(Starboard).values({ messageId: message.id }).run();
  db.insert(Starboard).values({ messageId: finalMessage.id }).run();
  logger.starboard(`Posted ${message.url} in '${reaction.message.guild?.name}'`);
};
