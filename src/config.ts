import rawConfig from './config.json';
import type { Template } from './models';

export interface GuildStarboardConfig {
  guild: string;
  channel: string;
  req: number;
}

export interface GuildRolesConfig {
  message: string;
  sheet: Record<string, string>;
}

export interface BotConfig {
  prefix: string;
  name: string;
  saveFromChannels: string[];
  genPerMessage: number;
  mainChannels: Record<string, string>;
  roleFilter: Record<string, string[]>;
  starboard: Record<string, GuildStarboardConfig>;
  roles: Record<string, GuildRolesConfig>;
  memes: Record<string, Template>;
}

const config = rawConfig as BotConfig;

export const {
  prefix,
  name,
  saveFromChannels,
  genPerMessage,
  mainChannels,
  roleFilter,
  starboard,
  roles,
  memes,
} = config;
