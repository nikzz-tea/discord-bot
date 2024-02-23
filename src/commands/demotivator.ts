import { Image, createCanvas, loadImage } from 'canvas';
import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import getRandomImage from '../utils/getRandomImage';
import genFiltered from '../utils/genFiltered';
import logChannel from '../utils/logChannel';

let retryCount = 0;

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
    (async function genDemotivator() {
      message.channel.sendTyping();
      try {
        const canvas = createCanvas(1280, 1024);
        const template = await loadImage(
          'https://cdn.discordapp.com/attachments/829357606224134174/1210584622715641876/template.png?ex=65eb17c9&is=65d8a2c9&hm=b99c8f254832cfc049420ad6719d2094a1304431a4a78ef0eafacc1c5d771467&',
        );
        let image: Image;
        try {
          image = await loadImage(Array.from(message.attachments.values())[0].url);
        } catch (error) {
          image = await loadImage(await getRandomImage(guild.id));
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
              attachment: canvas.toBuffer(),
              name: 'demotivator.png',
            },
          ],
        });
      } catch (error) {
        retryCount++;
        if (retryCount >= 5) return message.react('❌');
        logChannel.send(`\`\`\`json\n${error}\n\`\`\``);
        genDemotivator();
      }
    })();
  },
} as CommandObject;
