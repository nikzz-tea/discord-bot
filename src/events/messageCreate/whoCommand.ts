import { Message } from 'discord.js';
import { name } from '../../config.json';

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.toLowerCase().startsWith(`${name} кто`)) return;
  const members = Array.from(await message.guild?.members.fetch());
  message.channel.send(
    `я думаю это ${members[Math.floor(Math.random() * members.length)][1].user.username}`,
  );
};
