import { createCanvas, loadImage } from '@napi-rs/canvas';
import { memes } from '../config';
import type { CommandObject, Props, Template } from '../models';
import { getRandomImage, logger } from '../utils';

export default {
  aliases: ['мем'],
  cooldowns: {
    seconds: 3,
    errorMessage: 'подожди кд',
  },
  callback: async ({ guild, message }: Props) => {
    if (!message.channel.isSendable()) return;
    message.channel.sendTyping();

    try {
      const templates = Object.values(memes);
      const template = templates[Math.floor(Math.random() * templates.length)] as Template;
      const canvas = createCanvas(template.size[0], template.size[1]);
      const canvasTemplate = await loadImage(template.url);
      const ctx = canvas.getContext('2d');
      for (const box of template.boxes) {
        const image = await loadImage(await getRandomImage(message.client, guild.id));
        ctx.drawImage(image, box.leftCorner[0], box.leftCorner[1], box.size[0], box.size[1]);
      }
      ctx.drawImage(canvasTemplate, 0, 0);

      message.channel.send({
        files: [
          {
            attachment: canvas.toBuffer('image/png'),
            name: 'meme.png',
          },
        ],
      });
    } catch (error) {
      logger.error(String(error));
      return message.react('❌');
    }
  },
} satisfies CommandObject;
