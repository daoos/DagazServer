import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sess } from '../interfaces/sess.interface';
import { game_sessions } from '../entity/game_sessions';
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
                        c.name as creator, b.players_total as players_total,
                        a.last_setup
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id)
                 inner  join users c on (c.id = a.user_id)
                 where  a.status_id = 2 and a.closed is null
                 order  by a.id`);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.last_setup = x.last_setup;
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

    async getAvailPlayer(id: number, num: number): Promise<number> {
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
            `select a.player_num as player_num
             from ( select generate_series as player_num 
                    from   generate_series(1, $1)) a
             left   join   user_games b on (b.player_num = a.player_num and b.session_id = $2)
             where  b.id is null
             order  by player_num`, [cnt, id]);
        if (!y || y.length == 0) {
             return null;
        }
        const z = y.filter(function(it) {
            return it.player_num == num;
        });
        if (z && z.length == 1) {
            return z[0].player_num;
        }
        return y[0].player_num;
    }

    async joinToSession(user:number, s: Sess): Promise<number> {
        s.player_num = await this.getAvailPlayer(s.id, s.player_num);
        const t = await this.getMainTime(s.game_id);
        const y = await this.service.createQueryBuilder("user_games")
        .insert()
        .into(user_games)
        .values({
            user_id: user,
            session_id: s.id,
            player_num: s.player_num,
            time_limit: t
        })
        .returning('*')
        .execute();
        const uid = y.generatedMaps[0].id;
        const a: number = await this.getAvailPlayer(s.id, null);
        if (!a) {
            await this.service.createQueryBuilder("game_sessions")
            .update(game_sessions)
            .set({ 
                status_id: 2
             })
            .where("id = :id", {id: s.id})
            .execute();
        }
        if (s.player_num == 1) {
            await this.service.createQueryBuilder("game_sessions")
            .update(game_sessions)
            .set({ 
                last_time: Date.now()
             })
            .where("id = :id", {id: s.id})
            .execute();
        }
        return uid;
    }

    async findGame(filename: string): Promise<number> {
        const x = await this.service.query(
            `select id
             from   games
             where  filename = $1`, [filename]);
        if (!x || x.length != 1) {
             return null;
        }
        return x[0].id;
    }

    async findSessionByGame(filename: string): Promise<number> {
        const x = await this.service.query(
            `select distinct b.id as id
             from   games a
             inner  join game_sessions b on (b.game_id = a.id and b.closed is null and b.status_id = 1)
             inner  join user_games c on (c.session_id = b.id)
             inner  join users d on (d.id = c.user_id and d.is_anonymous = 1)
             where  a.filename = $1`, [filename]);
        if (!x || x.length != 1) {
             return null;
        }
        return x[0].id;
    }

    async createAnonymousSession(user:number, x: Sess): Promise<number> {
        const y = await this.service.createQueryBuilder("game_sessions")
        .insert()
        .into(game_sessions)
        .values({
            game_id: x.game_id,
            user_id: user,
            status_id: 1,
            last_time: Date.now()
        })
        .returning('*')
        .execute();
        return y.generatedMaps[0].id;
    }

    async getPlayerNum(uid: number): Promise<number> {
        const x = await this.service.query(
            `select player_num
             from   user_games
             where  id = $1`, [uid]);
        if (!x || x.length != 1) {
             return null;
        }
        return x[0].player_num;
    }

    async anonymous(user:number, s: Sess): Promise<Sess> {
        try {
            s.id = await this.findSessionByGame(s.filename);
            s.game_id = await this.findGame(s.filename);
            if (!s.game_id) {
                return null;
            }
            if (!s.id) {
                s.id = await this.createAnonymousSession(user, s);
            }
            if (!s.player_num) {
                s.player_num = 1;
            }
            const uid: number = await this.joinToSession(user, s);
            const num: number = await this.getPlayerNum(uid);
            if (!num) {
                return null;
            }
            const x = await this.service.query(
                `select a.status_id as status, a.game_id as game_id, b.name as game, b.filename as filename,
                        b.players_total as players_total
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id)
                 where  a.id = $1`, [s.id]);
            if (!x || x.length != 1) {
                return null;
            }
            s.status = x[0].status;
            s.game_id = x[0].game_id;
            s.game = x[0].game;
            s.filename = x[0].filename;
            s.players_total = x[0].players_total;
            s.player_num = num;
            s.uid = uid;
            return s;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async recovery(user:number, s: Sess): Promise<Sess[]> {
        try {
            const x = await this.service.query(
                `select b.id as id, b.game_id as game_id, c.name as game, c.filename as filename,
                        c.players_total as players_total, b.last_setup as last_setup,
                        a.player_num as player_num, a.id as uid
                 from   user_games a
                 inner  join game_sessions b on (b.id = a.session_id and b.closed is null)
                 inner  join games c on (c.id = b.game_id)
                 where  a.id = $1`, [s.uid]);
            let l: Sess[] = x.map(x => {
                let it = new Sess();
                it.id = x.id;
                it.game_id = x.game_id;
                it.game = x.game;
                it.filename = x.filename;
                it.players_total = x.players_total;
                it.last_setup = x.last_setup;
                it.player_num = x.player_num;
                it.uid = x.uid;
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

    async createSession(user:number, x: Sess): Promise<Sess> {
        try {
            const y = await this.service.createQueryBuilder("game_sessions")
            .insert()
            .into(game_sessions)
            .values({
                game_id: x.game_id,
                user_id: user,
                status_id: 2,
                last_time: Date.now()
            })
            .returning('*')
            .execute();
            x.id = y.generatedMaps[0].id;
            x.player_num = 1;
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

    async isValidUser(user: number, sess: number) {
        const x = await this.service.query(
            `select id
             from   users
             where  id = $1 and is_admin = 1`, [user]);
        if (x && x.length > 0) {
             return true;
        }
        const y = await this.service.query(
            `select b.id
             from   game_sessions a
             inner  join user_games b on (b.session_id = a.id and b.user_id = $1)
             inner  join users c on (c.id = b.user_id and c.is_anonymous = 1)
             where  a.id = $2`, [user, sess]);
        if (y && y.length > 0) {
             return true;
        }
        return false;
    }

    async getSession(uid: number): Promise<number> {
        const x = await this.service.query(
            `select session_id
             from   user_games
             where  id = $1`, [uid]);
        if (!x || x.length != 1) {
             return null;
        }
        return x[0].session_id;
    }

    async closeSession(user: number, x: Sess): Promise<Sess> {
        try {
            if (!x.id) {
                if (x.winner) {
                    x.id = await this.getSession(x.winner);
                }
                if (x.loser) {
                    x.id = await this.getSession(x.loser);
                }
            }
            const isValid: boolean = await this.isValidUser(user, x.id);
            if (!isValid) {
                return null;
            }
            await this.service.createQueryBuilder("game_sessions")
            .update(game_sessions)
            .set({ 
                status_id: 3,
                closed: new Date()
             })
            .where("id = :id", {id: x.id})
            .execute();
            if ((!x.winner && !x.loser) || (x.winner && x.loser)) {
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
                .where("id = :uid", {uid: x.winner})
                .execute();
                await this.service.createQueryBuilder("user_games")
                .update(user_games)
                .set({ 
                    score: x.score ? -x.score : null,
                    result_id: 2
                 })
                .where("session_id = :id and id <> :uid", {id: x.id, uid: x.winner})
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
                .where("id = :uid", {uid: x.loser})
                .execute();
                await this.service.createQueryBuilder("user_games")
                .update(user_games)
                .set({ 
                    score: x.score ? x.score : null,
                    result_id: 1
                 })
                .where("session_id = :id and id <> :uid", {id: x.id, uid: x.loser})
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
