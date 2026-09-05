import MarkovGen from 'markov-generator';
import { getMessages } from './getMessages';

export const genString = async (id: string, minLength: number) => {
  const messages = await getMessages(id);
  const markov = new MarkovGen({ input: messages, minLength });
  return markov.makeChain();
};
