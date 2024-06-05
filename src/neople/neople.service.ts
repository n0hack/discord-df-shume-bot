import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { FetchCharacterInfo } from './interfaces/character';
import { FetchCharacterSkillTree } from './neople.api';

@Injectable()
export class NeopleService {
  private readonly apiKey;
  private readonly apiBaseUrl;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>('NEOPLE_API_KEY');
    this.apiBaseUrl = configService.get<string>('NEOPLE_API_BASE_URL');
  }

  async fetchCharacterInfo(serverId: string, characterName: string) {
    const response = await axios.get<FetchCharacterInfo>(
      `${this.apiBaseUrl}/servers/${serverId}/characters?characterName=${characterName}&apikey=${this.apiKey}`,
    );
    return response.data;
  }

  async fetchCharacterSkillTree(serverId: string, characterId: string) {
    const response = await axios.get<FetchCharacterSkillTree>(
      `${this.apiBaseUrl}/servers/${serverId}/characters/${characterId}/skill/style?apikey=${this.apiKey}`,
    );
    return response.data;
  }
}
