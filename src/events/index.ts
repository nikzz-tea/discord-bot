import type { EventHandler } from '../models';
import memberLeave from './guildMemberRemove/memberLeave';
import customCommand from './messageCreate/customCommand';
import genMessages from './messageCreate/genMessages';
import saveMessages from './messageCreate/saveMessages';
import whoCommand from './messageCreate/whoCommand';
import rolesHandler from './messageReactionAdd/rolesHandler';
import starboardHandler from './messageReactionAdd/starboardHandler';
import rolesRemoveHandler from './messageReactionRemove/rolesRemoveHandler';

export const eventHandlers: { event: string; handler: EventHandler }[] = [
  { event: 'guildMemberRemove', handler: memberLeave },
  { event: 'messageCreate', handler: customCommand },
  { event: 'messageCreate', handler: genMessages },
  { event: 'messageCreate', handler: saveMessages },
  { event: 'messageCreate', handler: whoCommand },
  { event: 'messageReactionAdd', handler: rolesHandler },
  { event: 'messageReactionAdd', handler: starboardHandler },
  { event: 'messageReactionRemove', handler: rolesRemoveHandler },
];
