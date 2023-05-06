import { Guild, Message } from 'discord.js';

export interface ICommands {
  [x: string]: any[];
}

export interface Props {
  args: string[];
  guild: Guild;
  message: Message;
}
