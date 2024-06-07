import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Character, CharacterSkillTree } from './interfaces/character';
import { Item, ItemDetail, ItemSalesDetail } from './interfaces/item';

@Injectable()
export class NeopleService {
  private readonly apiKey;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = configService.get<string>('NEOPLE_API_KEY');
  }

  /**
   * 캐릭터 정보를 가져오는 함수
   * - 주로 `characterId`를 얻기 위해 사용함
   */
  async getCharacterInfo(serverId: string, characterName: string) {
    const { data } = await firstValueFrom<{ data: { rows: Character[] } }>(
      this.httpService.get(`servers/${serverId}/characters?characterName=${characterName}&apikey=${this.apiKey}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data.rows.length === 0 ? null : data.rows[0];
  }

  /**
   * 캐릭터의 스킬트리를 가져오는 함수
   */
  async getCharacterSkillTree(serverId: string, characterId: string) {
    const { data } = await firstValueFrom<{ data: CharacterSkillTree }>(
      this.httpService.get(`servers/${serverId}/characters/${characterId}/skill/style?apikey=${this.apiKey}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  /**
   * 아이템 정보를 가져오는 함수
   * - 주로 `itemId`를 얻기 위해 사용함
   */
  async getItemInfo(itemName: string) {
    const { data } = await firstValueFrom<{ data: { rows: Item[] } }>(
      this.httpService.get(`items?itemName=${itemName}&apikey=${this.apiKey}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data.rows.length === 0 ? null : data.rows[0];
  }

  /**
   * 아이템 상세 정보를 가져오는 함수
   */
  async getItemDetailInfo(itemId: string) {
    const { data } = await firstValueFrom<{ data: ItemDetail }>(
      this.httpService.get(`items/${itemId}?apikey=${this.apiKey}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  /**
   * 아이템 상점 판매 정보를 가져오는 함수
   */
  async getItemSalesInfo(itemId: string) {
    const { data } = await firstValueFrom<{ data: ItemSalesDetail }>(
      this.httpService.get(`items/${itemId}/shop?apikey=${this.apiKey}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }
}
