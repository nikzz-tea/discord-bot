import getMessages from './getMessages';
import MarkovGen from 'markov-generator';

const genString = async (id: string, minLength: number) => {
  const messages = await getMessages(id);
  const markov = new MarkovGen({ input: messages, minLength });
  return markov.makeChain();
};

export default genString;
