import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { DatabaseModule } from '../database/database.module';
import { challengeProvider } from './challenge.provider';
import { UsersService } from '../users/users.service';
import { usersProvider } from '../users/users.provider';
import { tokensProvider } from '../users/tokens.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...challengeProvider, ...usersProvider, ...tokensProvider, ChallengeService, UsersService],
  controllers: [ChallengeController]
})
export class ChallengeModule {}
