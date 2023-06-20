import MarkovGen from 'markov-generator';
import client from '..';
import { TextChannel } from 'discord.js';
import { logChannelId } from '../config.json';
import { Images, Messages } from '../database/models';
import { Op } from 'sequelize';

export const getGuildName = (id: string) => {
  let guildName = 'drip';
  if (id === '1039988408937881690') guildName = 'vnmb';
  return guildName;
};

export const logChannel = () => {
  return client.channels.cache.get(logChannelId) as TextChannel;
};

export const getMessages = async (id: string) => {
  const max = await Messages.count({ where: { guildId: id } });
  const start = Math.floor(Math.random() * max - 2000) + 1;
  const end = start + 2000;
  const rows = await Messages.findAll({
    where: {
      guildId: id,
      id: {
        [Op.between]: [start, end],
      },
    },
  });
  return rows.map((message) => message.get('message')) as string[];
};

export const getRandomImage = async (id: string) => {
  const table = await Images.findAll({ attributes: ['image'], where: { guildId: id } });
  const images = table.map((image) => image.get('image')) as string[];
  const filtered = images.filter(
    (item) => item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.jpeg'),
  );
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const genString = async (id: string) => {
  const messages = await getMessages(id);
  const markov = new MarkovGen({ input: messages, minLength: 1 });
  return markov.makeChain();
};

export const genFiltered = async (id: string) => {
  const messages = await getMessages(id);
  const filtered = messages.filter(
    (item) => !item.startsWith('<') || !item.endsWith('>') || !item.startsWith('http'),
  );
  const markov = new MarkovGen({ input: filtered, minLength: 1 });
  return markov.makeChain();
};
