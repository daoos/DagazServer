import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { DatabaseModule } from '../database/database.module';
import { challengeProvider } from './challenge.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...challengeProvider, ChallengeService],
  controllers: [ChallengeController]
})
export class ChallengeModule {}
