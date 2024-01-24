import client from '..';
import { TextChannel } from 'discord.js';
import { logChannelId } from '../config.json';

const logChannel = client.channels.cache.get(logChannelId) as TextChannel;

export default logChannel;
