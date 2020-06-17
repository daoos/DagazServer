import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { game_sessions } from '../../dist/entity/game_sessions';
import { Repository } from 'typeorm';
import { Sess } from '../interfaces/sess.interface';

@Injectable()
export class SessionService {

    constructor(
        @Inject('SESS_REPOSITORY')
        private readonly service: Repository<game_sessions>
    ) {}  

    async getInitSesssions(id: number): Promise<Sess[]> {
        try {
            const x = await this.service.query(
                `select a.id as id, a.status_id as status_id, a.game_id as game_id, 
                        c.name as game, c.filename as filename, a.created as created, 
                        d.name as creator, c.players_total as players_total, 
                        b.player_num as player_num, a.last_setup as last_setup, a.last_turn as last_turn
                 from   game_sessions a
                 inner  join challenge b on (b.session_id = a.id and b.user_id = $1)
                 inner  join games c on (c.id = a.game_id)
                 inner  join users d on (d.id = a.user_id)
                 where  a.status_id = 1
                 union  all
                 select a.id as id, a.status_id as status_id, a.game_id as game_id, 
                        c.name as game, c.filename as filename, a.created as created, 
                        d.name as creator, c.players_total as players_total, 
                        a.last_player + 1 as player_num, a.last_setup as last_setup, a.last_turn as last_turn
                 from   game_sessions a
                 left   join challenge b on (b.session_id = a.id)
                 inner  join games c on (c.id = a.game_id)
                 inner  join users d on (d.id = a.user_id)
                 where  a.status_id = 1 and b.user_id is null`, [id]);
            if (!x || x.length != 1) {
                return null;
            }
            let l: Sess[] = x.map(x => {
                let it = new Sess();
                it.id = x.id;
                it.status = x.status_id;
                it.game_id = x.game_id;
                it.game = x.game;
                it.filename = x.filename;
                it.created = x.created;
                it.creator = x.creator;
                it.players_total = x.players_total;
                it.player_num = x.player_num;
                it.last_setup = x.last_setup;
                it.last_turn = x.last_turn;
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
}
