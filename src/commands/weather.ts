import { CommandObject, Props } from '../models';
import { EmbedBuilder } from 'discord.js';
import { weatherService } from '../services/weather.service';

export default {
  aliases: ['погода'],
  callback: async ({ args, message }: Props) => {
    if (!args.length) return message.react('❌');
    if (!message.channel.isSendable()) return;
    const data = await weatherService.getWeather(args.join(' '));
    if (!data) return message.react('❌');
    const emb = new EmbedBuilder()
      .setTitle(data.name)
      .setDescription(data.weather[0].description)
      .setColor(message.member?.displayHexColor ?? 'Orange')
      .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL() ?? '' })
      .setThumbnail('https://img.icons8.com/clouds/2x/apple-weather.png')
      .addFields([
        { name: 'Температура', value: `${data.main.temp}℃`, inline: true },
        { name: 'Ощущается как', value: `${data.main.feels_like}℃`, inline: true },
        { name: 'Ветер', value: `${data.wind.speed}м/с`, inline: true },
        { name: 'Влажность', value: `${data.main.humidity}%`, inline: true },
      ]);
    message.channel.send({ embeds: [emb] });
  },
} satisfies CommandObject;
