import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sess } from '../interfaces/sess.interface';
import { game_sessions } from '../entity/game_sessions';
import { Join } from '../interfaces/join.interface';
import { user_games } from '../entity/user_games';

@Injectable()
export class SessionService {

    constructor(
        @Inject('SESS_REPOSITORY')
        private readonly service: Repository<game_sessions>
    ) {}  

    async getActiveSessions(): Promise<Sess[]> {
        try {
            const x = await this.service.query(
                `select a.id as id, a.status_id as status, a.game_id as game_id,
                        b.name as game, b.filename as filename, a.created as created,
                        c.name as creator, b.players_total as players_total
                 from game_sessions a
                 inner join games b on (b.id = a.game_id)
                 inner join users c on (c.id = a.user_id)
                 where a.status_id = 2 and a.closed is null`);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
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

    async getInitSessions(id: number): Promise<Sess[]> {
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

    async getSessionById(id: number): Promise<Sess> {
        try {
            const x = await this.service.createQueryBuilder("game_sessions")
            .where("game_sessions.id = :id", {id: id})
            .getOne();
            if (!x) {
              return null;
            }
            let it = new Sess();
            it.id = x.id;
            it.status = x.status_id;
            it.game_id = x.game_id;
            it.created = x.created;
            it.changed = x.changed;
            it.closed = x.closed;
            return it;
          } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async getMainTime(id: number): Promise<number> {
        const x = await this.service.query(
            `select main_time * 1000 as main_time
             from games where id = $1`, [id]);
        if (!x || x.length != 1) {
            return null;
        }
        return x[0].main_time;
    }

    async joinToSession(user:number, s: Sess): Promise<boolean> {
        const t = await this.getMainTime(s.game_id);
        await this.service.createQueryBuilder("user_games")
        .insert()
        .into(user_games)
        .values({
            user_id: user,
            session_id: s.id,
            player_num: 1,
            time_limit: t
        })
        .execute();
        return true;
    }

    async createSession(user:number, x: Sess): Promise<Sess> {
        try {
            const y = await this.service.createQueryBuilder("game_sessions")
            .insert()
            .into(game_sessions)
            .values({
                game_id: x.game_id,
                user_id: user,
                status_id: 2,
                last_user: user,
                last_time: Date.now()
            })
            .returning('*')
            .execute();
            x.id = y.generatedMaps[0].id;
            await this.joinToSession(user, x);
            return x;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async closeSession(x: Sess): Promise<Sess> {
        try {
            await this.service.createQueryBuilder("game_sessions")
            .update(game_sessions)
            .set({ 
                status_id: 3,
                closed: new Date()
             })
            .where("id = :id", {id: x.id})
            .execute();
            if (!x.winner && !x.loser) {
                await this.service.createQueryBuilder("user_games")
                .update(user_games)
                .set({ 
                    score: x.score ? x.score : null,
                    result_id: 3
                 })
                .where("session_id = :id", {id: x.id})
                .execute();
                return x;
            }
            if (x.winner) {
                await this.service.createQueryBuilder("user_games")
                .update(user_games)
                .set({ 
                    score: x.score ? x.score : null,
                    result_id: 1
                 })
                .where("session_id = :id and user_id = :user", {id: x.id, user: x.winner})
                .execute();
                await this.service.createQueryBuilder("user_games")
                .update(user_games)
                .set({ 
                    score: x.score ? -x.score : null,
                    result_id: 2
                 })
                .where("session_id = :id and user_id <> :user", {id: x.id, user: x.winner})
                .execute();
                return x;
            }
            if (x.loser) {
                await this.service.createQueryBuilder("user_games")
                .update(user_games)
                .set({ 
                    score: x.score ? -x.score : null,
                    result_id: 2
                 })
                .where("session_id = :id and user_id = :user", {id: x.id, user: x.loser})
                .execute();
                await this.service.createQueryBuilder("user_games")
                .update(user_games)
                .set({ 
                    score: x.score ? x.score : null,
                    result_id: 1
                 })
                .where("session_id = :id and user_id <> :user", {id: x.id, user: x.loser})
                .execute();
            }
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
