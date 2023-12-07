import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { logChannel } from '../utils';
import { read, MIME_GIF } from 'jimp';

export default {
  type: CommandType.LEGACY,
  callback: async ({ args, guild, message }: Props) => {
    if (message.attachments.size === 0) return message.react('❌');
    try {
      const attachment = message.attachments.first();
      const image = await read(attachment.url);
      const buffer = await image.getBufferAsync(MIME_GIF);
      message.reply({ files: [{ attachment: buffer, name: `${attachment.name}.gif` }] });
    } catch (error) {
      logChannel.send('```' + error + '```');
      message.react('❌');
    }
  },
} as CommandObject;
