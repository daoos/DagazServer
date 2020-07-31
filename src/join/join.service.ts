import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { user_games } from '../entity/user_games';
import { Repository } from 'typeorm';
import { Join } from '../interfaces/join.interface';
import { game_sessions } from '../entity/game_sessions';

@Injectable()
export class JoinService {

    constructor(
        @Inject('JOIN_REPOSITORY')
        private readonly service: Repository<user_games>
    ) {}  

    async getJoinedBySession(id: number): Promise<Join[]> {
        try {
            const x = await this.service.query(
                `select a.id as id, a.user_id as user_id, a.session_id as session_id, 
                        a.player_num as player_num, a.is_ai as is_ai, b.name as user
                 from   user_games a
                 inner  join users b on (b.id = a.user_id)
                 where  a.session_id = $1`, [id]);
            if (!x || x.length != 1) {
                return null;
            }
            let l: Join[] = x.map(x => {
                let it = new Join();
                it.id = x.id;
                it.session_id = x.session_id;
                it.user_id = x.user_id;
                it.user = x.user;
                it.player_num = x.player_num;
                it.is_ai = x.is_ai;
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

    async activateSession(id: number): Promise<boolean> {
        const x = await this.service.query(
            `select c.players_total as total_cnt, 
                    count(b.id) as current_cnt
             from   game_sessions a
             inner  join user_games b on (b.session_id = a.id)
             inner  join games c on (c.id = a.game_id)
             where  a.id = $1
             group  by c.players_total`, [id]);
        if (!x || x.length != 1) {
            return false;
        }
        if (x[0].current_cnt < x[0].total_cnt) {
            return false;
        }
        await this.service.createQueryBuilder("game_sessions")
        .update(game_sessions)
        .set({ status_id: 2 })
        .where("game_sessions.id = :id", {id: id})
        .execute();
        return true;
    }

    async getAvailPlayer(id: number): Promise<number> {
        const x = await this.service.query(
            `select b.players_total as cnt
             from   game_sessions a
             inner  join games b on (b.id = a.game_id)
             where  a.id = $1`, [id]);
        if (!x || x.length != 1) {
            return null;
        }
        const cnt = x[0].cnt;
        const y = await this.service.query(
            `select min(a.player_num) as player_num
             from ( select generate_series as player_num 
                    from   generate_series(1, $1)) a
             left   join   user_games b on (b.player_num = a.player_num and b.session_id = $2)`, [cnt, id]);
        if (!y || y.length != 1) {
             return null;
        }
        return y[0].player_num;
    }

    async getMainTime(id: number): Promise<number> {
        const x = await this.service.query(
            `select b.main_time * 1000 as main_time
             from game_sessions a
             inner join games b on (b.id = a.game_id)
             where a.id = :id`, [id]);
        if (!x || x.length != 1) {
            return null;
        }
        return x[0].main_time;
    }

    async joinToSession(user: number, x: Join): Promise<Join> {
        x.user_id = user;
        if (!x.is_ai) {
            x.is_ai = 0;
        }
        try {
            const t = await this.getMainTime(x.session_id);
            if (!x.player_num) {
                x.player_num = await this.getAvailPlayer(x.session_id);
            }
            if (!x.player_num) {
                return null;
            }
            const y = await this.service.createQueryBuilder("user_games")
            .insert()
            .into(user_games)
            .values({
                user_id: x.user_id,
                session_id: x.session_id,
                player_num: x.player_num,
                time_limit: t,
                is_ai: x.is_ai
            })
            .returning('*')
            .execute();
            x.id = y.generatedMaps[0].id;
            await this.activateSession(x.session_id);
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
