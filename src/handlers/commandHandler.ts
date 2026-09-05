import type { Client } from 'discord.js';
import { pathToFileURL } from 'url';
import path from 'path';
import { prefix } from '../config';
import type { CommandObject, SlashCommandObject } from '../models';
import getFiles from '../utils/getFiles';
import logger from '../utils/log';

const cooldowns = new Map<string, number>();

export default async (client: Client) => {
  const commands = new Map<string, CommandObject>();
  const slashCommands: SlashCommandObject[] = [];

  for (const file of getFiles(path.join(__dirname, '..', 'commands'))) {
    const module = (await import(pathToFileURL(file).href)) as {
      default: CommandObject | SlashCommandObject;
    };
    const command = module.default;

    if ('data' in command) {
      slashCommands.push(command);
      continue;
    }

    const name = path
      .basename(file)
      .replace(/\.(ts|js)$/, '')
      .toLowerCase();
    commands.set(name, command);
    for (const alias of command.aliases ?? []) {
      commands.set(alias.toLowerCase(), command);
    }
  }

  client.on('messageCreate', async (message) => {
    if (message.author.id === client.user?.id) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;
    const command = commands.get(commandName);
    if (!command) return;

    if (command.cooldowns) {
      const key = `${message.guild.id}:${commandName}`;
      const now = Date.now();
      const last = cooldowns.get(key) ?? 0;
      if (now - last < command.cooldowns.seconds * 1000) {
        if (message.channel.isSendable()) message.channel.send(command.cooldowns.errorMessage);
        return;
      }
      cooldowns.set(key, now);
    }

    logger.command(`${message.author.tag} used !${commandName}`);

    try {
      await command.callback({ args, guild: message.guild, message });
    } catch (error) {
      logger.error(String(error));
    }
  });

  client.on('interactionCreate', async (interaction) => {
    if (interaction.isAutocomplete()) {
      const command = slashCommands.find((cmd) => cmd.data.name === interaction.commandName);
      if (!command?.autocomplete) return;
      const choices = command.autocomplete().map((value) => ({ name: value, value }));
      await interaction.respond(choices);
      return;
    }

    if (!interaction.isChatInputCommand()) return;
    const command = slashCommands.find((cmd) => cmd.data.name === interaction.commandName);
    if (!command) return;

    logger.command(`${interaction.user.tag} used /${interaction.commandName}`);

    try {
      await command.callback({ interaction });
    } catch (error) {
      logger.error(String(error));
    }
  });

  if (client.application) {
    await client.application.commands.set(slashCommands.map((command) => command.data.toJSON()));
    logger.info(`Registered ${slashCommands.length} slash command(s)`);
  }
};
