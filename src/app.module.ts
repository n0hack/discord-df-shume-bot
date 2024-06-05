import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { ConfigModule } from '@nestjs/config';
import { NeopleModule } from './neople/neople.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordModule,
    NeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
