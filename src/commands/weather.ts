import axios from 'axios';
import { CommandObject, CommandType } from 'wokcommands';
import { IWeather, Props } from '../models';
import dotenv from 'dotenv';
import { EmbedBuilder } from 'discord.js';

dotenv.config();

export default {
  type: CommandType.LEGACY,
  aliases: ['погода'],
  reply: false,
  callback: async ({ args, guild, message }: Props) => {
    if (!args.length) return message.react('❌');
    try {
      const { data } = (await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ')}&appid=${
          process.env.OWM_API
        }&units=metric&lang=ru`,
      )) as IWeather;
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
      return {
        embeds: [emb],
      };
    } catch (error) {
      console.log(error);
      message.react('❌');
    }
  },
} as CommandObject;
