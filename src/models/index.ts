import { Guild, Message } from 'discord.js';

export interface Props {
  args: string[];
  guild: Guild;
  message: Message;
}

export interface ITemplate {
  url: string;
  size: number[];
  boxes: {
    size: number[];
    leftCorner: number[];
  }[];
}

export interface INovel {
  results: {
    id: string;
    title: string;
    length_minutes?: number;
    rating?: number;
    image?: { url: string };
    description?: string;
  }[];
}

export interface IWeather {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}
