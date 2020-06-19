import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { DatabaseModule } from '../database/database.module';
import { resProvider } from './result.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...resProvider, ResultService],
  controllers: [ResultController]
})
export class ResultModule {}
