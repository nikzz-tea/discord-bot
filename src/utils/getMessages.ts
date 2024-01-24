import { Messages } from '../database/models';

const getMessages = async (id: string) => {
  const max = await Messages.count({ where: { guildId: id } });
  const limit = 500;
  const start = Math.floor(Math.random() * max - limit) + 1;
  const rows = await Messages.findAll({
    where: {
      guildId: id,
    },
    offset: start,
    limit,
  });
  return rows.map((message) => message.get('message')) as string[];
};

export default getMessages;
