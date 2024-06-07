import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChannelType, Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { NeopleService } from '../neople/neople.service';
import * as events from './events';
import * as crons from './events/crons';
import { getKST } from './utils/time';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(
    private configService: ConfigService,
    private neopleService: NeopleService,
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }

  async onModuleInit() {
    const token = this.configService.get('DISCORD_BOT_TOKEN');

    await this.client.login(token);

    this.client.on('ready', () => events.ready(this.client));
    this.client.on('guildMemberAdd', (member) => events.guildMemberAdd(member));
    this.client.on('interactionCreate', (interaction) => events.interactionCreate(interaction, this.neopleService));
    this.client.on('messageCreate', (message) => events.messageCreate(message));
  }

  /**
   * 매일 자정에 장비 등급을 알려주는 메서드
   * - 장비 등급이 최상급이 아닌 경우에도 알려줌
   * - `KST`로 시간대를 고정했기에, 어떤 환경에서든 대한민국 시간 자정에 실행
   */
  @Cron(CronExpression.EVERY_SECOND)
  notifyDailyItemGrade() {
    const channel = this.client.channels.cache.find((cn) => cn.type === ChannelType.GuildText && cn.name === '오늘의-등급');
    const { hour, minute, second } = getKST();

    if (channel instanceof TextChannel && hour === 0 && minute === 0 && second === 0) {
      crons.itemGrade(channel, this.neopleService);
    }
  }
}
