import { Module } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';
import { DatabaseModule } from '../database/database.module';
import { bonusProvider } from './bonus.provider';
import { usersProvider } from '../users/users.provider';
import { tokensProvider } from '../users/tokens.provider';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...bonusProvider, ...usersProvider, ...tokensProvider, BonusService, UsersService],
  controllers: [BonusController]
})
export class BonusModule {}
