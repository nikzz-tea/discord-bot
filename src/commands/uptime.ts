import type { CommandObject, Props } from '../models';

export default {
  callback: ({ message }: Props) => {
    if (!message.channel.isSendable()) return;
    message.channel.send(`<t:${Math.round((Date.now() - message.client.uptime) / 1000)}:R>`);
  },
} satisfies CommandObject;
