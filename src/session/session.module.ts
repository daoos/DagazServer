import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { DatabaseModule } from '../database/database.module';
import { sessProvider } from './session.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...sessProvider, SessionService],
  controllers: [SessionController]
})
export class SessionModule {}
