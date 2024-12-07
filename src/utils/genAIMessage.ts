import { Message } from 'discord.js';
import { prefix, maxTokens as max_tokens, AIProfile, AIModel as model } from '../config.json';
import { openai } from '..';
import { ChatCompletionMessageParam } from 'openai/resources';

const genAIMessage = async (message: Message) => {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: AIProfile,
    },
  ];

  const prevMessages = (await message.channel.messages.fetch({ limit: 50 })).reverse();

  prevMessages.forEach((msg: Message) => {
    if (msg.author.bot && msg.author.id !== message.client.user.id) return;
    if (msg.content.startsWith(prefix)) return;
    if (msg.author.id === message.client.user.id) {
      return messages.push({
        role: 'assistant',
        name: msg.author.username,
        content: msg.content,
      });
    }
    messages.push({
      role: 'user',
      name: msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, ''),
      content: msg.content,
    });
  });

  const response = await openai.chat.completions
    .create({
      model,
      messages,
      max_tokens,
    })
    .catch((e) => {
      console.error(e);
      message.react('❌');
    });

  if (!response) return;

  return response.choices[0].message.content;
};

export default genAIMessage;
