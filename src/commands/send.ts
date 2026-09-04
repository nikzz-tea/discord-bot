import { CommandObject, Props } from '../models';
import { ownerId } from '../config.json';
import { TextChannel } from 'discord.js';

export default {
  callback: ({ args, message }: Props) => {
    if (message.author.id !== ownerId) return;
    if (!args.length) return;
    try {
      const channel = message.client.channels.cache.get(args[0]) as TextChannel;
      channel.send(args.slice(1).join(' '));
    } catch (error) {
      return;
    }
  },
} satisfies CommandObject;
