import axios from 'axios';
import { IWeather } from '../models';

export const weatherService = {
  async getWeather(location: string) {
    const { data } = await axios.get<IWeather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OWM_API}&units=metric&lang=ru`,
    );
    return data;
  },
};
