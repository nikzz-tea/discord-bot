import { Guild, Message } from 'discord.js';

export interface ICommands {
  [x: string]: object[];
}

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

export interface IWeather {
  data: {
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
  };
}
