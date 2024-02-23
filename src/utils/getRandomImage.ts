import { Images } from '../database/models';

const getRandomImage = async (id: string) => {
  const table = await Images.findAll({ attributes: ['image'], where: { guildId: id } });
  const images = table.map((image) => image.get('image')) as string[];
  console.log(images);
  const filtered = images.filter(
    (item) => item.includes('.png') || item.includes('.jpg') || item.includes('.jpeg'),
  );
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export default getRandomImage;
