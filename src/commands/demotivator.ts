import { createCanvas, loadImage } from 'canvas';
import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { genFiltered, getRandomImage } from '../utils';

export default {
  type: CommandType.LEGACY,
  aliases: ['демотиватор', 'д'],
  reply: false,
  cooldowns: {
    duration: '3 s',
    errorMessage: 'подожди кд',
    type: 'perGuild',
  },
  callback: async ({ args, guild, message }: Props) => {
    try {
      message.channel.sendTyping();
      const canvas = createCanvas(1280, 1024);
      const template = await loadImage(
        'https://cdn.discordapp.com/attachments/829357606224134174/888106080482238495/template.png',
      );
      const image = await loadImage(getRandomImage(guild.id));
      const ctx = canvas.getContext('2d');
      ctx.drawImage(template, 0, 0);
      ctx.drawImage(image, 118, 103, 1050, 710);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '72px Times New Roman';
      ctx.fillText(genFiltered(guild.id).slice(0, 30), canvas.width / 2, 886);
      ctx.font = '40px Times New Roman';
      ctx.fillText(genFiltered(guild.id).slice(0, 60), canvas.width / 2, 966);
      return {
        files: [
          {
            attachment: canvas.toBuffer(),
            name: 'image.png',
          },
        ],
      };
    } catch (error) {
      return message.react('❌');
    }
  },
} as CommandObject;
