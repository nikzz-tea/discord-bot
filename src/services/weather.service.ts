import axios from 'axios';
import type { Weather } from '../models';
import { logger } from '../utils';

export const weatherService = {
  async getWeather(location: string) {
    try {
      const { data } = await axios.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OWM_API}&units=metric&lang=ru`,
      );
      return data;
    } catch (error) {
      logger.error(String(error));
      return undefined;
    }
  },
};
