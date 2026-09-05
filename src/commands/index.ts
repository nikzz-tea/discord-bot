import type { CommandObject, SlashCommandObject } from '../models';
import addcom from './addcom';
import character from './character';
import commandsCommand from './commands';
import delcom from './delcom';
import demotivator from './demotivator';
import meme from './meme';
import roll from './roll';
import saved from './saved';
import avatar from './slash/avatar';
import uptime from './uptime';
import video from './video';
import vn from './vn';
import weather from './weather';
import youtube from './youtube';

export type NamedCommand = CommandObject & { name: string };

export const prefixCommands: NamedCommand[] = [
  { name: 'addcom', ...addcom },
  { name: 'character', ...character },
  { name: 'commands', ...commandsCommand },
  { name: 'delcom', ...delcom },
  { name: 'demotivator', ...demotivator },
  { name: 'meme', ...meme },
  { name: 'roll', ...roll },
  { name: 'saved', ...saved },
  { name: 'uptime', ...uptime },
  { name: 'video', ...video },
  { name: 'vn', ...vn },
  { name: 'weather', ...weather },
  { name: 'youtube', ...youtube },
];

export const slashCommands: SlashCommandObject[] = [avatar];
