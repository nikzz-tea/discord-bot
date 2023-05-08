import { createCanvas, loadImage } from 'canvas';
import { CommandObject, CommandType } from 'wokcommands';
import { ITemplate, Props } from '../models';
import { getRandomImage } from '../utils';
import { memes } from '../config.json';

export default {
  type: CommandType.LEGACY,
  aliases: ['м'],
  reply: false,
  cooldowns: {
    duration: '3 s',
    errorMessage: 'подожди кд',
    type: 'perGuild',
  },
  callback: async ({ args, guild, message }: Props) => {
    try {
      message.channel.sendTyping();
      const template = memes[
        Object.keys(memes)[Math.floor(Math.random() * Object.keys(memes).length)]
      ] as ITemplate;

      const canvas = createCanvas(template.size[0], template.size[1]);
      const canvasTemplate = await loadImage(template.url);
      const ctx = canvas.getContext('2d');
      for (const box of template.boxes) {
        const image = await loadImage(getRandomImage(guild.id));
        ctx.drawImage(image, box.leftCorner[0], box.leftCorner[1], box.size[0], box.size[1]);
      }
      ctx.drawImage(canvasTemplate, 0, 0);
      return {
        files: [
          {
            attachment: canvas.toBuffer(),
            name: 'image.png',
          },
        ],
      };
    } catch (error) {
      console.log(error);
      return message.react('❌');
    }
  },
} as CommandObject;
