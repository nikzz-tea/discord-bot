import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { ownerId } from '../config.json';
import { AIMode } from '../events/messageCreate/genMessages';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    if (message.author.id !== ownerId) return;
    AIMode.on = !AIMode.on;
    message.channel.send(AIMode.on ? 'on' : 'off');
  },
} as CommandObject;
