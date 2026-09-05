import { MessageReaction, User } from 'discord.js';
import { roles } from '../../config';
import logger from '../../utils/log';

export default async (reaction: MessageReaction, user: User) => {
  const guildId = reaction.message.guildId;
  if (!guildId) return;
  const config = roles[guildId];
  if (!config || reaction.message.id !== config.message) return;
  reaction = await reaction.fetch();
  const guild = reaction.message.guild;
  if (!guild) return;
  const roleId = config.sheet[reaction.emoji.identifier];
  if (!roleId) return;
  const role = guild.roles.cache.get(roleId);
  if (!role) return;
  const member = guild.members.cache.get(user.id);
  if (!member) return;
  member.roles.add(role);
  logger.role(`Gave \`${role.name}\` to \`${user.tag}\` in \`${guild.name}\``);
};
