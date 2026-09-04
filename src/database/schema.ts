import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const Commands = sqliteTable(
  'commands',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    content: text('content'),
    guildId: text('guildId'),
  },
  (table) => [uniqueIndex('commands_name_guild_id').on(table.name, table.guildId)],
);

export const Messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  message: text('message'),
  guildId: text('guildId'),
});

export const Images = sqliteTable(
  'images',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    channelId: text('channelId'),
    messageId: text('messageId'),
    index: integer('index'),
    guildId: text('guildId'),
  },
  (table) => [uniqueIndex('images_message_id_index').on(table.messageId, table.index)],
);

export const Starboard = sqliteTable('starboard', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  messageId: text('messageId'),
});
