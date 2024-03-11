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

export interface IChar {
  results: {
    id: string;
    name: string;
    image?: { url: string };
    description?: string;
    height?: number;
    weight?: number;
    bust?: number;
    waist?: number;
    hips?: number;
    cup?: string;
    age?: number;
    sex?: string[];
    vns: { id: string; title: string }[];
    traits: { id: string; name: string }[];
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

export interface PM2Stats {
  pid: number;
  name: string;
  pm2_env: {
    pm_uptime: number;
  };
  monit: {
    memory: number;
    cpu: number;
  };
}
