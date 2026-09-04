import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import * as schema from './schema';

const sqlite = new Database('db.sqlite');

export const db = drizzle(sqlite, { schema });

const syncSchema = () => {
  sqlite.run(`
    CREATE TABLE IF NOT EXISTS "commands" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name" TEXT,
      "content" TEXT,
      "guildId" TEXT
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "commands_name_guild_id" ON "commands" ("name", "guildId");

    CREATE TABLE IF NOT EXISTS "messages" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "message" TEXT,
      "guildId" TEXT
    );

    CREATE TABLE IF NOT EXISTS "images" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "channelId" TEXT,
      "messageId" TEXT,
      "index" INTEGER,
      "guildId" TEXT
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "images_message_id_index" ON "images" ("messageId", "index");

    CREATE TABLE IF NOT EXISTS "starboard" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "messageId" TEXT
    );
  `);
};

export default syncSchema;
