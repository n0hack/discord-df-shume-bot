import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { ready } from './events/ready';
import { guildMemberAdd } from './events/guildMemberAdd';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(private configService: ConfigService) {
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
    const token = this.configService.get<string>('TOKEN');
    await this.client.login(token);

    this.client.on('ready', () => ready(this.client));
    this.client.on('guildMemberAdd', (member) => guildMemberAdd(member));
  }
}
