import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';

export default {
  type: CommandType.LEGACY,
  aliases: ['аватар'],
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    let member =
      message.mentions.members?.first() ??
      message.guild?.members.cache.get(args[0]) ??
      message.member;
    return {
      content: member?.displayAvatarURL({ size: 512 }),
    };
  },
} as CommandObject;
