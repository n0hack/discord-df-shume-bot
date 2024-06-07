import { CommandInteraction } from 'discord.js';

const messages = [
  '안개의 안녕을 전하오! 오늘도 모든 일이 순조롭기를 기원하오.',
  '안개가 맑은 오늘, 좋은 하루 되길 바라겠소이다.',
  '안개의 향기와 함께, 당신의 하루가 밝고 기쁨으로 가득하기를 바라오.',
  '안개의 안녕을 드리오! 이곳 청연에서 당신을 맞이하겠소이다.',
  '안개의 안녕을 전하오! 오늘도 안전하고 행복한 하루 되길 기원하오.',
];

export const greeting = async (interaction: CommandInteraction) => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const userId = interaction.user.id;

  await interaction.reply(`<@${userId}> 공. ${randomMessage}`);
};
