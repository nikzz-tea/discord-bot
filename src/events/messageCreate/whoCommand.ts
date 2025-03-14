import { GuildMember, Message } from 'discord.js';
import { name, roleFilter } from '../../config.json';

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.toLowerCase().startsWith(`${name} кто`)) return;
  const members = Array.from(await message.guild?.members.fetch());
  const sendMessage = (array: [string, GuildMember][]) => {
    const randomUsername = array[Math.floor(Math.random() * array.length)][1].user.username;
    message.channel.send('я думаю это ' + randomUsername);
  };
  if (!roleFilter[message.guildId]) {
    return sendMessage(members);
  }
  const filteredMembers = members.filter((member) =>
    member[1].roles.cache.some((role) => roleFilter[message.guildId].includes(role.id)),
  );
  sendMessage(filteredMembers);
};
