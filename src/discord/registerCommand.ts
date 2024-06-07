/**
 * 디스코드 봇에 커맨드를 등록하기 위해 사용하는 코드입니다.
 * - 개발 환경에서만 사용되며, pnpm set:command 명령어 수행 시 적용됩니다.
 */
import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { commands } from './commands';

config();

async function registerCommand() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.DISCORD_BOT_CLIENT_ID;

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('👾 [슈므] 명령어 등록 중');

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log('👾 [슈므] 명령어 등록 완료');
  } catch (e) {
    console.error(e);
  }
}

registerCommand();
