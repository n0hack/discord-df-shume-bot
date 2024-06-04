import { Client } from 'discord.js';

export const ready = (client: Client) => {
  console.log(`백해의 조화와 약속을 수호하는 ${client.user.tag} 등장이오!`);
};
