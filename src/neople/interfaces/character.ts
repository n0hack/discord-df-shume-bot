export type Character = {
  serverId: string;
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  fame: number;
};

type Skill = {
  skillId: string;
  name: string;
  level: number;
  requiredLevel: number;
  costType: 'SP' | 'TP';
};

type SkillGroup = {
  hash: string;
  style: {
    active: Skill[];
    passive: Skill[];
  };
};

export type CharacterSkillTree = Character & {
  skill: SkillGroup;
};
