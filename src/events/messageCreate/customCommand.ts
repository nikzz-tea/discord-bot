import { Message } from 'discord.js';
import { prefix } from '../../config.json';
import { Commands } from '../../database/models';

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) return;
  if (!message.content.startsWith(prefix)) return;
  const commands = await Commands.findAll({
    attributes: ['name'],
    where: { guildId: message.guildId },
  });
  const keys = commands.map((command) => command.get('name')) as string[];
  for (const key of keys) {
    if (message.content.toLowerCase() === `${prefix}${key.toLowerCase()}`) {
      message.channel.send(
        (await Commands.findOne({ where: { name: key, guildId: message.guildId } })).get('content'),
      );
    }
  }
};
