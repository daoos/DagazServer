import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { game_moves } from '../entity/game_moves';
import { Repository } from 'typeorm';
import { Move } from '../interfaces/move.interface';
import { game_sessions } from '../entity/game_sessions';

@Injectable()
export class MoveService {

    constructor(
        @Inject('MOVE_REPOSITORY')
        private readonly service: Repository<game_moves>
    ) {}  
    
    async getMovesBySession(id: number): Promise<Move[]> {
        try {
            const x = await this.service.query(
                `select id, session_id, user_id, turn_num,
                        move_str, setup_str, note
                 from   game_moves
                 where  session_id = $1
                 order  by id`, [id]);
            if (!x || x.length != 1) {
                return null;
            }
            let l: Move[] = x.map(x => {
                let it = new Move();
                it.id = x.id;
                it.session_id = x.session_id;
                it.user_id = x.user_id;
                it.turn_num = x.turn_num;
                it.move_str = x.move_str;
                it.setup_str = x.setup_str;
                it.note = x.note;
                return it;
            });
            return l;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async addMove(user: number, x: Move): Promise<Move> {
        try {
            x.user_id = user;
            const y = await this.service.createQueryBuilder("game_moves")
            .insert()
            .into(game_moves)
            .values({
                session_id: x.session_id,
                user_id: x.user_id,
                turn_num: x.turn_num,
                move_str: x.move_str,
                setup_str: x.setup_str,
                note: x.note
            })
            .returning('*')
            .execute();
            x.id = y.generatedMaps[0].id;
            await this.service.createQueryBuilder("game_sessions")
            .update(game_sessions)
            .set({ 
                last_turn: x.turn_num,
                last_setup: x.setup_str
             })
            .where("game_sessions.id = :id", {id: x.session_id})
            .execute();
            return x;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }
}
