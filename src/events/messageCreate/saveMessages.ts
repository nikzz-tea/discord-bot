import { Message } from 'discord.js';
import fs from 'fs';
import { name, prefix, saveFromChannels, genPerMessage } from '../../config.json';
import { genString, getGuildName } from '../../utils';

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
    const data = fs.readFileSync(`./db/${type}.${guildName}.json`, 'utf-8');
    const obj = JSON.parse(data);
    const item =
      type === 'messages' ? message.content : Array.from(message.attachments.values())[0].url;
    obj.list.unshift(item);
    obj.length++;
    if (obj.length % genPerMessage === 0) genString(message.guild?.id as string);
    const json = JSON.stringify(obj, null, 2);
    fs.writeFileSync(`./db/${type}.${guildName}.json`, json);
  };
  if (message.content != '') pushItem('messages');
  if (message.attachments.size > 0) pushItem('images');
};
