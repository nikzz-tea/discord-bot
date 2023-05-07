import { EmbedBuilder, GuildMember, TextChannel } from 'discord.js';
import { mainChannels } from '../../config.json';

export default (member: GuildMember) => {
  const channel = member.client.channels.cache.get(mainChannels[member.guild.id]) as TextChannel;
  const emb = new EmbedBuilder().setTitle(`${member.user.tag} ливнул`);
  channel.send({ embeds: [emb] });
};
