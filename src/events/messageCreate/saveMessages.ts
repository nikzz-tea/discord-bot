import { Message } from 'discord.js';
import fs from 'fs';
import { name, prefix, saveFromChannels, genPerMessage } from '../../config.json';
import { genString, getGuildName } from '../../utils';

let count = 0;

export default (message: Message) => {
  if (message.content.startsWith(prefix)) return;
  if (message.content.startsWith(name)) return;
  if (message.content.startsWith(`${name} кто`)) return;
  if (message.author.bot) return;
  if (!saveFromChannels.includes(message.channel.id)) return;
  count++;
  count % genPerMessage === 0 && message.channel.send(genString(message.guild?.id as string));
  const pushItem = (type: string) => {
    const guildName = getGuildName(message.guild?.id as string);
    const data = fs.readFileSync(`./db/${type}.${guildName}.json`, 'utf-8');
    const obj = JSON.parse(data);
    const item =
      type === 'messages' ? message.content : Array.from(message.attachments.values())[0].url;
    obj.list.unshift(item);
    obj.length++;
    const json = JSON.stringify(obj, null, 2);
    fs.writeFileSync(`./db/${type}.${guildName}.json`, json);
  };
  if (message.content != '') pushItem('messages');
  if (message.attachments.size > 0) pushItem('images');
};
