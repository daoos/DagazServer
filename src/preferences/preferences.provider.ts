import { Connection } from 'typeorm';
import { user_preferences } from '../entity/user_preferences';

export const prefsProvider = [
    {
      provide: 'PREFS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(user_preferences),
      inject: ['DATABASE_CONNECTION'],
    },
 ];