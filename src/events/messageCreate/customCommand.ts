import { Message } from 'discord.js';
import { prefix } from '../../config.json';
import { Commands } from '../../database/models';

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.startsWith(prefix)) return;
  const name = message.content.slice(prefix.length).split(' ')[0];
  const command: any = await Commands.findOne({
    where: { name, guildId: message.guildId },
  });
  if (!command) return;
  message.channel.send(command.content);
};
