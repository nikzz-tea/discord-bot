import { TextChannel } from 'discord.js';
import client from '..';
import sequelize from '../database';
import { Images } from '../database/models';

const getRandomImage = async (id: string) => {
  const entry = (
    await Images.findOne({ order: sequelize.random(), where: { guildId: id } })
  ).toJSON();
  const channel = (await client.channels.fetch(entry.channelId)) as TextChannel;
  const message = await channel.messages.fetch(entry.messageId);
  const attachments = Array.from(message.attachments.values());
  return attachments[entry.index].url;
};

export default getRandomImage;
