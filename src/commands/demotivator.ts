import { Image, createCanvas, loadImage } from '@napi-rs/canvas';
import type { CommandObject, Props } from '../models';
import { genFiltered, getRandomImage, logger } from '../utils';

export default {
  aliases: ['демотиватор', 'д'],
  cooldowns: {
    seconds: 3,
    errorMessage: 'подожди кд',
  },
  callback: async ({ guild, message }: Props) => {
    if (!message.channel.isSendable()) return;
    message.channel.sendTyping();

    try {
      const canvas = createCanvas(1280, 1024);
      const template = await loadImage('https://i.imgur.com/vPFTZT8.png');
      let image: Image;
      try {
        image = await loadImage(Array.from(message.attachments.values())[0].url);
      } catch (error) {
        image = await loadImage(await getRandomImage(message.client, guild.id));
      }
      const ctx = canvas.getContext('2d');
      ctx.drawImage(template, 0, 0);
      ctx.drawImage(image, 118, 103, 1050, 710);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '72px Times New Roman';
      const topText = await genFiltered(guild.id);
      ctx.fillText(topText.slice(0, 30), canvas.width / 2, 886);
      ctx.font = '40px Times New Roman';
      const bottomText = await genFiltered(guild.id);
      ctx.fillText(bottomText.slice(0, 60), canvas.width / 2, 966);

      message.channel.send({
        files: [
          {
            attachment: canvas.toBuffer('image/png'),
            name: 'demotivator.png',
          },
        ],
      });
    } catch (error) {
      logger.error(String(error));
      return message.react('❌');
    }
  },
} satisfies CommandObject;
