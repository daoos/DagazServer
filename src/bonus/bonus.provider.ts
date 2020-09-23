import { Connection } from 'typeorm';
import { bonuses } from '../entity/bonuses';

export const bonusProvider = [
    {
      provide: 'BONUS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(bonuses),
      inject: ['DATABASE_CONNECTION'],
    },
 ];