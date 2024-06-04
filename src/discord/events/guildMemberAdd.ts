import { GuildMember } from 'discord.js';

export const guildMemberAdd = (member: GuildMember) => {
  const userId = member.user.id;

  member.guild.systemChannel.send(
    `<@${userId}> 모험가 공 디스코드 브런치 서버에 오신 것을 환영하오! 이곳에 오신 것을 진심으로 기뻐하오이다.\n우선 이곳에서 사용하는 닉네임(별명)을 대표 캐릭터명으로 변경하고, 좌측에 보이는 규칙 채널에서 내용 숙지를 부탁드리오.\n\n그럼 앞으로 잘 부탁드리겠소이다!`,
  );
};
