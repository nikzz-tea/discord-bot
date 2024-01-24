import { MessageReaction, User } from 'discord.js';
import { roles } from '../../config.json';
import logChannel from '../../utils/logChannel';

export default async (reaction: MessageReaction, user: User) => {
  if (reaction.message.id !== roles[reaction.message.guildId].message) return;
  reaction = await reaction.fetch();
  const sheet = roles[reaction.message.guildId].sheet;
  if (!Object.keys(sheet).includes(reaction.emoji.identifier)) return;
  const role = reaction.message.guild.roles.cache.get(sheet[reaction.emoji.identifier]);
  const member = reaction.message.guild.members.cache.get(user.id);
  member.roles.add(role);
  logChannel.send(`**${reaction.message.guild.name}:**\nGave \`${role.name}\` to \`${user.tag}\``);
};
