import { MessageReaction } from 'discord.js';
import { roles } from '../../config.json';
import { getGuildName, logChannel } from '../../utils';

export default async (reaction: MessageReaction) => {
  const guildName = getGuildName(reaction.message.guild.id);
  if (reaction.message.id !== roles[guildName].message) return;
  reaction = await reaction.fetch();
  const sheet = roles[guildName].sheet;
  if (!Object.keys(sheet).includes(reaction.emoji.identifier)) return;
  const role = reaction.message.guild.roles.cache.get(sheet[reaction.emoji.identifier]);
  reaction.message.member.roles.remove(role);
  logChannel().send(`Removed ${role.name} from ${reaction.message.member.user.tag}`);
};
