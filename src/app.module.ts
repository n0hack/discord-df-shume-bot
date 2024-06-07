import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { DiscordModule } from './discord/discord.module';
import { NeopleModule } from './neople/neople.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(), DiscordModule, NeopleModule],
  controllers: [AppController],
})
export class AppModule {}
