import { Message } from 'discord.js';
import fs from 'fs';
import { name, prefix } from '../../config.json';

export default (message: Message) => {
  if (
    message.content.startsWith(prefix) ||
    message.content.startsWith(name) ||
    message.content.startsWith(`${name} кто`) ||
    message.author.bot
  )
    return;
  let guildName = 'drip';
  if (message.guild?.id === '1039988408937881690') guildName = 'vnmb';
  const pushItems = (type: string) => {
    const data = fs.readFileSync(`./src/db/${type}.${guildName}.json`, 'utf-8');
    const obj = JSON.parse(data);
    const item =
      type === 'messages' ? message.content : Array.from(message.attachments.values())[0].url;
    obj.list.push(item);
    obj.length++;
    const json = JSON.stringify(obj, null, 2);
    fs.writeFileSync(`./src/db/${type}.${guildName}.json`, json);
  };
  if (message.content != '') pushItems('messages');
  if (message.attachments.size > 0) pushItems('images');
};
