import { Connection } from "typeorm";
import { ai_request } from "../entity/ai_request";

export const aiProvider = [
    {
      provide: 'AI_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(ai_request),
      inject: ['DATABASE_CONNECTION'],
    },
 ];