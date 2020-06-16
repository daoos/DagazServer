import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { DatabaseModule } from '../database/database.module';
import { prefsProvider } from './preferences.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...prefsProvider, PreferencesService],
  controllers: [PreferencesController]
})
export class PreferencesModule {}
