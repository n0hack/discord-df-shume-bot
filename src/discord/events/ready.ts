import { Client } from 'discord.js';

export const ready = (client: Client) => {
  const channel = client.guilds.cache.first().systemChannel;

  // channel.send('백해의 조화와 약속을 수호하는 땅지기 등장이오!');
  console.log(`👾 [${client.user.tag}] 실행 완료`);
};
