import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PreferencesModule } from './preferences/preferences.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { ChallengeModule } from './challenge/challenge.module';
import { JoinModule } from './join/join.module';
import { MoveModule } from './move/move.module';
import { ResultModule } from './result/result.module';
import { GameModule } from './game/game.module';
import { BonusModule } from './bonus/bonus.module';
import { TournamentModule } from './tournament/tournament.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, PreferencesModule, SessionModule, ChallengeModule, JoinModule, MoveModule, ResultModule, GameModule, BonusModule, TournamentModule, RatingModule],
  controllers: [AppController]
})
export class AppModule {}
