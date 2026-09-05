export const getRandomVn = (list: string[]) => {
  return list[Math.floor(Math.random() * list.length)];
};
