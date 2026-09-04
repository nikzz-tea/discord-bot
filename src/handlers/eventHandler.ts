import type { Client } from 'discord.js';
import { pathToFileURL } from 'url';
import path from 'path';
import getFiles from '../utils/getFiles';

type Handler = (...args: any[]) => unknown;

export default async (client: Client) => {
  const events = new Map<string, Handler[]>();

  for (const file of getFiles(path.join(__dirname, '..', 'events'))) {
    const eventName = path.basename(path.dirname(file));
    const module = (await import(pathToFileURL(file).href)) as { default: Handler };
    const handlers = events.get(eventName) ?? [];
    handlers.push(module.default);
    events.set(eventName, handlers);
  }

  for (const [eventName, handlers] of events) {
    client.on(eventName, async (...args) => {
      for (const handler of handlers) {
        try {
          await handler(...args);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
};
