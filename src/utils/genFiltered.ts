import MarkovGen from 'markov-generator';
import { getMessages } from './getMessages';

const filterString = (string: string) => {
  const array = string.split(' ');
  array.filter((word) => !word.startsWith('<') || !word.endsWith('>') || !word.startsWith('http'));
  return array.join(' ');
};

export const genFiltered = async (id: string) => {
  const messages = await getMessages(id);
  const filtered = messages.map((message) => filterString(message));
  const markov = new MarkovGen({ input: filtered, minLength: 1 });
  return markov.makeChain();
};
