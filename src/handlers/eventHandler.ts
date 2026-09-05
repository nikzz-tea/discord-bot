import type { Client } from 'discord.js';
import { eventHandlers } from '../events';
import type { EventHandler } from '../models';
import { logger } from '../utils';

export default async (client: Client) => {
  const events = new Map<string, EventHandler[]>();
  for (const { event, handler } of eventHandlers) {
    const handlers = events.get(event) ?? [];
    handlers.push(handler);
    events.set(event, handlers);
  }

  for (const [eventName, handlers] of events) {
    client.on(eventName, async (...args) => {
      for (const handler of handlers) {
        try {
          await handler(...args);
        } catch (error) {
          logger.error(String(error));
        }
      }
    });
  }
};
