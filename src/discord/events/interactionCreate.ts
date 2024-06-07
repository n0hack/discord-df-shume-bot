import { Interaction } from 'discord.js';
import { NeopleService } from '../../neople/neople.service';
import { Command } from '../commands';
import * as interactions from './interactions';

export const interactionCreate = async (interaction: Interaction, neopleService: NeopleService) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName as Command) {
    case '인사':
      interactions.greeting(interaction);
      break;
    case '스킬트리':
      interactions.skillTree(interaction, neopleService);
      break;
  }
};
