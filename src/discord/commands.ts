import { serverList } from 'src/neople/constants/server';

export const commands = [
  {
    name: '인사',
    description: '슈므에게 인사를 건넵니다.',
  },
  {
    name: '스킬트리',
    description: '캐릭터의 스킬트리를 확인합니다.',
    options: [
      {
        name: '서버',
        description: '캐릭터가 속한 서버의 이름입니다.',
        type: 3,
        required: true,
        choices: serverList.map((server) => ({
          name: server.serverName,
          value: server.serverId,
        })),
      },
      {
        name: '캐릭터',
        description: '캐릭터의 이름입니다.',
        type: 3,
        required: true,
      },
    ],
  },
] as const;

export type Command = (typeof commands)[number]['name'];
