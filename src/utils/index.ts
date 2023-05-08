import fs from 'fs';
import MarkovGen from 'markov-generator';

export const getGuildName = (id: string) => {
  let guildName = 'drip';
  if (id === '1039988408937881690') guildName = 'vnmb';
  return guildName;
};

export const getMessages = (id: string) => {
  const guildName = getGuildName(id);
  const data = fs.readFileSync(`./db/messages.${guildName}.json`, 'utf-8');
  const obj = JSON.parse(data);
  return obj.list as string[];
};

export const getRandomImage = (id: string) => {
  const guildName = getGuildName(id);
  const data = fs.readFileSync(`./db/images.${guildName}.json`, 'utf-8');
  const obj = JSON.parse(data);
  const images = obj.list.filter(
    (item) => item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.jpeg'),
  );
  return images[Math.floor(Math.random() * images.length)];
};

export const genString = (id: string) => {
  const list = getMessages(id);
  const max = list.length;
  const start = Math.floor(Math.random() * max - 1000) + 1;
  const end = start + 1000;
  const messages = list.slice(start, end);
  const markov = new MarkovGen({ input: messages, minLength: 1 });
  return markov.makeChain();
};

export const genFiltered = (id: string) => {
  const list = getMessages(id).filter(
    (item) => !item.startsWith('<') || !item.endsWith('>') || !item.startsWith('http'),
  );
  const max = list.length;
  const start = Math.floor(Math.random() * max - 1000) + 1;
  const end = start + 1000;
  const messages = list.slice(start, end);
  const markov = new MarkovGen({ input: messages, minLength: 1 });
  return markov.makeChain();
};
