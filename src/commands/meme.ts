import { createCanvas, loadImage } from '@napi-rs/canvas';
import { CommandObject, ITemplate, Props } from '../models';
import { memes } from '../config.json';
import getRandomImage from '../utils/getRandomImage';

let retryCount = 0;

export default {
  aliases: ['мем'],
  cooldowns: {
    seconds: 3,
    errorMessage: 'подожди кд',
  },
  callback: async ({ guild, message }: Props) => {
    (async function genMeme() {
      if (!message.channel.isSendable()) return;
      message.channel.sendTyping();
      try {
        const template = memes[
          Object.keys(memes)[Math.floor(Math.random() * Object.keys(memes).length)]
        ] as ITemplate;
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
        retryCount++;
        if (retryCount >= 5) return message.react('❌');
        console.error(error);
        genMeme();
      }
    })();
  },
} satisfies CommandObject;
