import { Interaction } from 'discord.js';
import { Command } from '../commands';
import { greetingToShume } from './interactions/greeting';
import { checkSkillTree } from './interactions/skill';
import { NeopleService } from 'src/neople/neople.service';

export const interactionCreate = async (interaction: Interaction, neopleService: NeopleService) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName as Command) {
    case '인사':
      greetingToShume(interaction);
      break;
    case '스킬트리':
      checkSkillTree(interaction, neopleService);
      break;
  }
};
