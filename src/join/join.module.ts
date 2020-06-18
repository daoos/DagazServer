import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { DatabaseModule } from '../database/database.module';
import { joinProvider } from './join.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...joinProvider, JoinService],
  controllers: [JoinController]
})
export class JoinModule {}
