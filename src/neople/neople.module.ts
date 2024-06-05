import { Module } from '@nestjs/common';
import { NeopleService } from './neople.service';

@Module({
  providers: [NeopleService],
  exports: [NeopleService],
})
export class NeopleModule {}
