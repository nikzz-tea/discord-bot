import { Message } from 'discord.js';
import fs from 'fs';
import { name, prefix, saveFromChannels } from '../../config.json';

export const getGuildName = (id: string) => {
  let guildName = 'drip';
  if (id === '1039988408937881690') guildName = 'vnmb';
  return guildName;
};

export default (message: Message) => {
  if (
    message.content.startsWith(prefix) ||
    message.content.startsWith(name) ||
    message.content.startsWith(`${name} кто`) ||
    message.author.bot ||
    !saveFromChannels.includes(message.channel.id)
  )
    return;
  const pushItem = (type: string) => {
    const guildName = getGuildName(message.guild?.id as string);
    const data = fs.readFileSync(`./src/db/${type}.${guildName}.json`, 'utf-8');
    const obj = JSON.parse(data);
    const item =
      type === 'messages' ? message.content : Array.from(message.attachments.values())[0].url;
    obj.list.unshift(item);
    obj.length++;
    const json = JSON.stringify(obj, null, 2);
    fs.writeFileSync(`./src/db/${type}.${guildName}.json`, json);
  };
  if (message.content != '') pushItem('messages');
  if (message.attachments.size > 0) pushItem('images');
};
