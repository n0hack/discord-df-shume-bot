import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { ready } from './events/ready';
import { guildMemberAdd } from './events/guildMemberAdd';
import { NeopleService } from 'src/neople/neople.service';
import { commands } from './commands';
import { interactionCreate } from './events/interactionCreate';

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
    const token = this.configService.get<string>('TOKEN');

    // await this.setCommands();
    await this.client.login(token);

    this.client.on('ready', () => ready(this.client));
    this.client.on('guildMemberAdd', (member) => guildMemberAdd(member));
    this.client.on('interactionCreate', (interaction) => interactionCreate(interaction, this.neopleService));
  }

  async setCommands() {
    const token = this.configService.get<string>('TOKEN');
    const clientId = this.configService.get<string>('CLIENT_ID');

    const rest = new REST({ version: '10' }).setToken(token);

    try {
      console.log('슈므 봇 커맨드 등록 중!');

      await rest.put(Routes.applicationCommands(clientId), {
        body: commands,
      });

      console.log('슈므 봇 커맨드 등록 완료!');
    } catch (error) {
      console.error(error);
    }
  }
}
