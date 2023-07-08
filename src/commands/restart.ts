import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { exec } from 'child_process';
import { logChannel } from '../utils';
import { ownerId } from '../config.json';

export default {
  type: CommandType.LEGACY,
  reply: false,
  callback: ({ args, guild, message }: Props) => {
    if (message.author.id !== ownerId) return { content: 'хуй' };
    if (!args.length) return { content: 'хуй' };
    exec(`pm2 restart ${args[0]}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      logChannel.send(`\`\`\`${stdout}\`\`\``);
    });
  },
} as CommandObject;
