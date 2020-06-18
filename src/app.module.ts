import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PreferencesModule } from './preferences/preferences.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { ChallengeModule } from './challenge/challenge.module';
import { JoinModule } from './join/join.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, PreferencesModule, SessionModule, ChallengeModule, JoinModule],
  controllers: [AppController]
})
export class AppModule {}
