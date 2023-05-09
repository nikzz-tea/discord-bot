import { MessageReaction, User } from 'discord.js';
import { roles } from '../../config.json';
import { getGuildName, logChannel } from '../../utils';

export default async (reaction: MessageReaction, user: User) => {
  const guildName = getGuildName(reaction.message.guild.id);
  if (reaction.message.id !== roles[guildName].message) return;
  reaction = await reaction.fetch();
  const sheet = roles[guildName].sheet;
  if (!Object.keys(sheet).includes(reaction.emoji.identifier)) return;
  const role = reaction.message.guild.roles.cache.get(sheet[reaction.emoji.identifier]);
  const member = reaction.message.guild.members.cache.get(user.id);
  member.roles.add(role);
  logChannel().send(`Gave \`${role.name}\` to \`${user.tag}\``);
};
