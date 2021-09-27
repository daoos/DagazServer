import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tokensProvider } from '../users/tokens.provider';
import { usersProvider } from '../users/users.provider';
import { UsersService } from '../users/users.service';
import { AiController } from './ai.controller';
import { aiProvider } from './ai.provider';
import { AiService } from './ai.service';

@Module({
  imports: [DatabaseModule],
  providers: [...aiProvider, ...usersProvider, ...tokensProvider, AiService, UsersService],
  controllers: [AiController]
})
export class AiModule {}
