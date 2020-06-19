import { Module } from '@nestjs/common';
import { MoveService } from './move.service';
import { MoveController } from './move.controller';
import { DatabaseModule } from '../database/database.module';
import { moveProvider } from './move.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...moveProvider, MoveService],
  controllers: [MoveController]
})
export class MoveModule {}
