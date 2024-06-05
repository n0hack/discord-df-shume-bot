import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { NeopleModule } from 'src/neople/neople.module';

@Module({
  imports: [NeopleModule],
  providers: [DiscordService],
})
export class DiscordModule {}
