import type {
  ChatInputCommandInteraction,
  Guild,
  Message,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export interface Props {
  args: string[];
  guild: Guild;
  message: Message;
}

export interface CommandObject {
  aliases?: string[];
  cooldowns?: {
    seconds: number;
    errorMessage: string;
  };
  callback: (props: Props) => unknown;
}

export interface SlashCommandObject {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  autocomplete?: () => string[];
  callback: (props: { interaction: ChatInputCommandInteraction }) => unknown;
}
