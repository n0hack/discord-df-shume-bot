import { EmbedBuilder, Interaction } from 'discord.js';
import { NeopleService } from 'src/neople/neople.service';

export const checkSkillTree = async (interaction: Interaction, neopleService: NeopleService) => {
  if (!interaction.isCommand()) return;

  const serverId = `${interaction.options.get('서버').value}`;
  const characterName = `${interaction.options.get('캐릭터').value}`;

  const character = await neopleService.fetchCharacterInfo(serverId, characterName);

  if (character.rows.length === 0) {
    await interaction.reply('캐릭터 정보가 없소이다.');
    return;
  }

  const characterId = character.rows[0].characterId;

  const skillTree = await neopleService.fetchCharacterSkillTree(serverId, characterId);
  const activeSkills = skillTree.skill.style.active.map((skill) => `- ${skill.name} (${skill.level})`);
  const nonTpSkills = skillTree.skill.style.passive
    .filter((skill) => skill.costType === 'SP')
    .map((skill) => `- ${skill.name} (${skill.level})`);
  const tpSkills = skillTree.skill.style.passive
    .filter((skill) => skill.costType === 'TP')
    .map((skill) => `- [TP] ${skill.name} (${skill.level})`);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`${characterName} 모험가 공의 스킬트리를 확인하시오!`)
    .setDescription(`${character.rows[0].jobName} / ${character.rows[0].jobGrowName}`)
    .addFields(
      { name: '\n', value: '\n' },
      { name: '액티브 스킬', value: activeSkills.join('\n'), inline: true },
      { name: '패시브 스킬', value: [...nonTpSkills, ...tpSkills].join('\n'), inline: true },
      { name: '\n', value: '\n' },
      { name: '스킬코드', value: `\`${skillTree.skill.hash}\`` },
    );

  await interaction.reply({ embeds: [embed] });
};
