import { GuildMember, Message } from 'discord.js';
import client from '../..';
import { name, whoExclude } from '../../config.json';

export default async (message: Message) => {
  if (message.author.id === client.user?.id) return;
  if (!message.content.toLowerCase().startsWith(`${name} кто`)) return;
  const members = await message.guild?.members.fetch();
  const users = [] as string[];
  members?.forEach((member) => {
    if (!whoExclude.includes(member.user.username)) users.push(member.user.username);
  });
  if (message.content.toLowerCase().startsWith(`${name} кто и кто`)) {
    message.channel.send(
      `${users[Math.floor(Math.random() * users.length)]} и ${
        users[Math.floor(Math.random() * users.length)]
      }`,
    );
    return;
  }
  message.channel.send(`я думаю это ${users[Math.floor(Math.random() * users.length)]}`);
};
