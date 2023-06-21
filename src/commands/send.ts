import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { ownerId } from '../config.json';
import { TextChannel } from 'discord.js';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    if (message.author.id !== ownerId) return;
    if (!args.length) return;
    try {
      const channel = message.client.channels.cache.get(args[0]) as TextChannel;
      channel.send(args.slice(1).join(' '));
    } catch (error) {
      return;
    }
  },
} as CommandObject;
