import { Module } from '@nestjs/common';
import { NeopleModule } from '../neople/neople.module';
import { DiscordService } from './discord.service';

@Module({
  imports: [NeopleModule],
  providers: [DiscordService],
})
export class DiscordModule {}
