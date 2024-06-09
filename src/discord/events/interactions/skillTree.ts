import { CommandInteraction } from 'discord.js';
import { NeopleService } from '../../../neople/neople.service';
import { ShumeEmbedBuilder } from '../../utils/embed';

export const skillTree = async (interaction: CommandInteraction, neopleService: NeopleService) => {
  const serverId = `${interaction.options.get('서버').value}`;
  const characterName = `${interaction.options.get('캐릭터명').value}`;

  try {
    const characterInfo = await neopleService.getCharacterInfo(serverId, characterName);

    if (!characterInfo) {
      await interaction.reply(`"${characterName}"이라는 캐릭터는 존재하지 않소이다.`);
      return;
    }

    const skillTree = await neopleService.getCharacterSkillTree(serverId, characterInfo.characterId);

    // 불러온 스킬트리 정보를 알맞게 가공(액티브, 패시브, 스킬코드)
    const activeSkills = skillTree.skill.style.active.map((skill) => `- ${skill.name} (${skill.level})`);
    const nonTpSkills = skillTree.skill.style.passive
      .filter((skill) => skill.costType === 'SP')
      .map((skill) => `- ${skill.name} (${skill.level})`);
    const tpSkills = skillTree.skill.style.passive
      .filter((skill) => skill.costType === 'TP')
      .map((skill) => `- [TP] ${skill.name} (${skill.level})`);
    const skillCode = skillTree.skill.hash;

    const embed = new ShumeEmbedBuilder()
      .setTitle(`${characterName} 모험가 공의 스킬트리를 가져왔소이다!`)
      .setDescription(`${characterInfo.jobName} / ${characterInfo.jobGrowName}`)
      .addFields({ name: '\n', value: '\n' })
      .addFields({
        name: '액티브 스킬',
        value: activeSkills.join('\n'),
        inline: true,
      })
      .addFields({
        name: '패시브 스킬',
        value: [...nonTpSkills, ...tpSkills].join('\n'),
        inline: true,
      })
      .addFields({ name: '\n', value: '\n' })
      .addFields({ name: '스킬코드', value: `\`${skillCode}\`` });

    await interaction.reply({ embeds: [embed] });
  } catch (e) {
    await interaction.reply('던전앤파이터 API가 응답하지 않소이다. 나중에 다시 시도하시오.');
  }
};
