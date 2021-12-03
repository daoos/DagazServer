import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProvider } from './users.provider';
import { tokensProvider } from './tokens.provider';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './upload',
  }), DatabaseModule],
  providers: [...usersProvider, ...tokensProvider, UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
