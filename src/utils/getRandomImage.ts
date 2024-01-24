import { Images } from '../database/models';

const getRandomImage = async (id: string) => {
  const table = await Images.findAll({ attributes: ['image'], where: { guildId: id } });
  const images = table.map((image) => image.get('image')) as string[];
  const filtered = images.filter(
    (item) => item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.jpeg'),
  );
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export default getRandomImage;
