import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NeopleService } from './neople.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('NEOPLE_API_BASE_URL'),
        timeout: 5000,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NeopleService],
  exports: [NeopleService],
})
export class NeopleModule {}
