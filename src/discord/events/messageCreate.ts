import { Message } from 'discord.js';

export const messageCreate = (message: Message) => {
  if (message.author.bot) return;

  if (message.content === 'test') {
    message.reply('테스트');
  }
};
