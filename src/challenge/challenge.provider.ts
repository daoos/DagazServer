import { Connection } from 'typeorm';
import { challenge } from '../entity/challenge';

export const challengeProvider = [
    {
      provide: 'CHALLENGE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(challenge),
      inject: ['DATABASE_CONNECTION'],
    },
 ];