import { Image, createCanvas, loadImage } from 'canvas';
import { CommandObject, CommandType } from 'wokcommands';
import { Props } from '../models';
import { genFiltered, getRandomImage, logChannel } from '../utils';

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
          'https://cdn.discordapp.com/attachments/829357606224134174/888106080482238495/template.png',
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
        logChannel.send(`\`\`\`json\n${error}\n\`\`\``);
        genDemotivator();
      }
    })();
  },
} as CommandObject;
