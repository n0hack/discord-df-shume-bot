export interface Character {
  serverId: string;
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  fame: number;
}

export interface Skill {
  skillId: string;
  name: string;
  level: number;
  requiredLevel: number;
  costType: 'SP' | 'TP';
}

export interface CharacterSkillTree extends Character {
  skill: {
    hash: string;
    style: {
      active: Skill[];
      passive: Skill[];
    };
  };
}

export interface FetchCharacterInfo {
  rows: Character[];
}

export interface FetchCharacterSkillTree extends CharacterSkillTree {}
