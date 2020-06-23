import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { DatabaseModule } from '../database/database.module';
import { prefsProvider } from './preferences.provider';
import { usersProvider } from '../users/users.provider';
import { UsersService } from '../users/users.service';
import { tokensProvider } from '../users/tokens.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...prefsProvider, ...usersProvider, ...tokensProvider, PreferencesService, UsersService],
  controllers: [PreferencesController]
})
export class PreferencesModule {}
