import getMessages from './getMessages';
import MarkovGen from 'markov-generator';

const genFiltered = async (id: string) => {
  const messages = await getMessages(id);
  const filtered = messages.filter(
    (item) => !item.startsWith('<') || !item.endsWith('>') || !item.startsWith('http'),
  );
  const markov = new MarkovGen({ input: filtered, minLength: 1 });
  return markov.makeChain();
};

export default genFiltered;
