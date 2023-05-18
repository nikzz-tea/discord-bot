import { CommandObject, CommandType } from 'wokcommands';
import client from '..';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: () => {
    return {
      content: `<t:${Math.round((Date.now() - client.uptime) / 1000)}:R>`,
    };
  },
} as CommandObject;
