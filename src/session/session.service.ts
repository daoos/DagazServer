import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sess } from '../interfaces/sess.interface';
import { game_sessions } from '../entity/game_sessions';
import { user_games } from '../entity/user_games';
import { game_moves } from '../entity/game_moves';
import { challenge } from '../entity/challenge';
import { game_alerts } from '../entity/game_alerts';
import { Exp } from '../interfaces/exp.interface';
import { ai_settings } from '../entity/ai_settings';
import { Tourn } from '../interfaces/tourn.interface';
import { tournament_games } from '../entity/tournament_games';
import { tournament_users } from '../entity/tournament_users';
import { user_ratings } from '../entity/user_ratings';
import { GameTime } from '../interfaces/gametime.interface';
import { ai_response } from '../entity/ai_response';
import { ai_request } from '../entity/ai_request';

@Injectable()
export class SessionService {

       constructor(
           @Inject('SESS_REPOSITORY')
           private readonly service: Repository<game_sessions>
       ) {}  

       async getRealm(user: number): Promise<number> {
        const x = await this.service.query(
          `select realm_id
           from   users
           where  id = $1`, [user]);
        if (!x || x.length != 1) {
            return null;
        }
        return x[0].realm_id;
      }

      async exportSession(sid: number): Promise<Exp[]> {
          try {
            const x = await this.service.query(
                `select a.turn_num as turn_num, b.player_num as player_num, 
                        a.move_str as move_str
                 from   game_moves a
                 inner  join user_games b on (b.id = a.uid)
                 where  a.session_id = $1
                 order  by a.turn_num`, [sid]);
            if (!x || x.length == 0) {
                 return null;
            }
            let l: Exp[] = x.map(x => {
                let it = new Exp();
                it.turn = x.turn_num;
                it.player = x.player_num;
                it.move = x.move_str;
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

      async getTournSessions(tourn: number, auth: number, user: number): Promise<Sess[]> {
        try {
            const x = await this.service.query(
                `select distinct a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, b.name) || ' (' || a.id || ')' as game, coalesce(d.filename, b.filename) || coalesce(h.suffix, '') as filename, 
                        a.created as created, c.name as creator, b.players_total as players_total, a.last_setup as last_setup, 
                        string_agg(
                            case
                              when e.is_ai = 1 then 'AI'
                              else f.name
                            end || ' (' || e.player_num || 
                        ')', ' / ' order by e.player_num) as player_name,
                        coalesce(a.last_turn, 0) as last_turn, coalesce(a.selector_value, 0) as selector_value, x.id as ai
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id)
                 inner  join users c on (c.id = a.user_id)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join user_games e on (e.session_id = a.id)
                 inner  join users f on (f.id = e.user_id)
                 left   join user_games x on (x.session_id = a.id and x.is_ai = 1)
                 inner  join tournament_games i on (i.session_id = a.id and i.tournament_id = $1)
                 left   join user_games j on (j.session_id = a.id and j.user_id = $2)
                 left   join game_styles h on (h.game_id = b.id and h.player_num = j.player_num)
                 left   join user_games k on (k.session_id = a.id and k.user_id = $3)
                 where  coalesce(k.user_id, 0) = $4
                 group  by a.id, a.status_id, a.game_id, d.id, d.name, b.name, d.filename, b.filename, a.created, c.name, b.players_total, a.last_setup, x.id, h.suffix`, [tourn, auth, user, user]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.variant_id = x.variant_id;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.player_name = x.player_name;
                    it.last_setup = x.last_setup;
                    it.last_turn = x.last_turn;
                    it.selector_value = x.selector_value;
                    it.ai = x.ai;
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

      async getCurrentSessionsVar(user: number, variant: number): Promise<Sess[]> {
          try {
            const x = await this.service.query(
                `select a.id, a.last_setup, a.status_id as status, a.game_id, a.variant_id, a.last_turn
                 from   game_sessions a
                 inner  join user_games b on (b.session_id = a.id and b.player_num = a.next_player and b.user_id = $1)
                 where  a.status_id = 2 and a.closed is null and a.variant_id = $2 and not a.last_setup is null
                 order  by a.changed
                 limit  1`, [user, variant]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.last_setup = x.last_setup;
                    it.last_turn = x.last_turn;
                    return it;
                });
                for (let i = 0; i < l.length; i++) {
                    await this.setLastTime(l[i].id);
                }
                return l;
          } catch (error) {
              console.error(error);
              throw new InternalServerErrorException({
                  status: HttpStatus.BAD_REQUEST,
                  error: error
              });
          }
      }

      async getCurrentSessions(user: number): Promise<Sess[]> {
        try {
            const realm = await this.getRealm(user);
            const x = await this.service.query(
                `select a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, b.name) || ' (' || a.id || ')' as game, coalesce(d.filename, b.filename) || coalesce(h.suffix, '') as filename, 
                        a.created as created, c.name as creator, b.players_total as players_total, a.last_setup as last_setup,
                        string_agg(
                            case
                              when e.is_ai = 1 then 'AI'
                              else f.name
                            end || ' (' || e.player_num || ')', ' / ' order by e.player_num) as player_name,
                        coalesce(a.last_turn, 0) as last_turn, coalesce(a.selector_value, 0) as selector_value, x.id as ai, a.changed as changed,
                        a.timecontrol_id, t.name as timecontrol
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id)
                 inner  join users c on (c.id = a.user_id and c.realm_id = $1)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join user_games e on (e.session_id = a.id)
                 inner  join users f on (f.id = e.user_id and f.realm_id = $2)
                 left   join user_games g on (g.session_id = a.id and g.user_id = $3 and g.is_ai = 0)
                 left   join game_styles h on (h.game_id = b.id and h.player_num = g.player_num)
                 inner  join user_games i on (i.session_id = a.id and i.player_num = a.next_player and i.user_id = $4)
                 left   join user_games x on (x.session_id = a.id and x.is_ai = 1)
                 left   join time_controls t on (t.id = a.timecontrol_id)
                 where  a.status_id = 2 and a.closed is null
                 group  by a.id, a.status_id, a.game_id, d.id, d.name, b.name, d.filename, b.filename, a.created, c.name, b.players_total, a.last_setup, h.suffix, x.id, a.timecontrol_id, t.name
                 union  all
                 select a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, e.name) || ' (' || a.id || ')' as game, coalesce(d.filename, e.filename) || coalesce(h.suffix, '') as filename,
                        a.created as created, j.name as creator, e.players_total as players_total, a.last_setup as last_setup,
                        string_agg(
                            case
                              when k.is_ai = 1 then 'AI'
                              else f.name
                            end || ' (' || k.player_num || ')', ' / ' order by k.player_num) as player_name,
                        coalesce(a.last_turn, 0) as last_turn, coalesce(a.selector_value, 0) as selector_value, x.id as ai, a.changed as changed,
                        a.timecontrol_id, t.name as timecontrol
                 from   game_sessions a
                 inner  join user_games b on (b.session_id = a.id and b.player_num = 1 and b.user_id = $5)
                 left   join game_moves c on (c.session_id = a.id)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join games e on (e.id = a.game_id)
                 left   join user_games g on (g.session_id = a.id and g.user_id = $6 and g.is_ai = 0)
                 left   join game_styles h on (h.game_id = e.id and h.player_num = g.player_num)
                 inner  join users j on (j.id = a.user_id and j.realm_id = $7)
                 inner  join user_games k on (k.session_id = a.id)
                 inner  join users f on (f.id = k.user_id and f.realm_id = $8)
                 left   join user_games x on (x.session_id = a.id and x.is_ai = 1)
                 left   join time_controls t on (t.id = a.timecontrol_id)
                 where  c.id is null and a.closed is null
                 group  by a.id, a.status_id, a.game_id, d.id, d.name, e.name, d.filename, e.filename, a.created, e.players_total, a.last_setup, h.suffix, x.id, j.name, a.timecontrol_id, t.name
                 order  by changed desc`, [realm, realm, user, user, user, user, realm, realm]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.variant_id = x.variant_id;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.player_name = x.player_name;
                    it.last_setup = x.last_setup;
                    it.last_turn = x.last_turn;
                    it.selector_value = x.selector_value;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
                    it.ai = x.ai;
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

    async getAllSessions(user: number, game: number, variant: number): Promise<Sess[]> {
        try {
            const realm = await this.getRealm(user);
            const x = await this.service.query(
                `select a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, b.name) || ' (' || a.id || ')' as game, coalesce(d.filename, b.filename) || coalesce(h.suffix, '') as filename, 
                        a.created as created, c.name as creator, b.players_total as players_total, a.last_setup as last_setup,
                        string_agg(
                            case
                              when e.is_ai = 1 then 'AI'
                              else f.name
                            end || ' (' || e.player_num || 
                        ')', ' / ' order by e.player_num) as player_name,
                        coalesce(a.last_turn, 0) as last_turn, coalesce(a.selector_value, 0) as selector_value, x.id as ai,
                        a.timecontrol_id, t.name as timecontrol
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id and coalesce($1, b.id) = b.id)
                 inner  join users c on (c.id = a.user_id and c.realm_id = $2)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join user_games e on (e.session_id = a.id)
                 inner  join users f on (f.id = e.user_id and f.realm_id = $3)
                 left   join user_games g on (g.session_id = a.id and g.user_id = $4 and g.is_ai = 0)
                 left   join game_styles h on (h.game_id = b.id and h.player_num = g.player_num)
                 left   join user_games x on (x.session_id = a.id and x.is_ai = 1)
                 left   join time_controls t on (t.id = a.timecontrol_id)
                 where  coalesce(a.last_turn, 0) > 0
                 and  ( coalesce($5, d.id) = d.id or d.id is null )
                 group  by a.id, a.status_id, a.game_id, d.id, d.name, b.name, d.filename, b.filename, a.created, c.name, b.players_total, a.last_setup, h.suffix, x.id, a.timecontrol_id, t.name
                 order  by a.changed desc`, [game, realm, realm, user, variant]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.variant_id = x.variant_id;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.player_name = x.player_name;
                    it.last_setup = x.last_setup;
                    it.last_turn = x.last_turn;
                    it.selector_value = x.selector_value;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
                    it.ai = x.ai;
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

    async getWaitingSessions(user: number, game: number, variant: number): Promise<Sess[]> {
        try {
            const realm = await this.getRealm(user);
            const x = await this.service.query(
                `select a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, b.name) || ' (' || a.id || ')' as game, coalesce(d.filename, b.filename) as filename, 
                        a.created as created, c.name  || ' (' || e.player_num || ')' as creator, b.players_total as players_total,
                        a.last_setup as last_setup, e.player_num as player_num, coalesce(a.selector_value, 0) as selector_value,
                        a.timecontrol_id, g.name as timecontrol
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id and coalesce($1, b.id) = b.id)
                 inner  join users c on (c.id = a.user_id and c.realm_id = $2)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join user_games e on (e.session_id = a.id and e.user_id <> $3)
                 left   join black_list f on (
                        f.user_id = a.user_id and f.restricted_id = $4 and
                        coalesce(f.game_id, b.id) = b.id and
                      ( d.id is null or coalesce(f.variant_id, d.id) = d.id)
                 )
                 left   join time_controls g on (g.id = a.timecontrol_id)
                 where  a.status_id = 1 and a.closed is null
                 and  ( coalesce($5, d.id) = d.id or d.id is null )
                 and    f.id is null
                 order  by a.created desc`, [game, realm, user, user, variant]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.variant_id = x.variant_id;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.player_name = x.creator;
                    it.player_num = x.player_num;
                    it.last_setup = x.last_setup;
                    it.selector_value = x.selector_value;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
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

    async getActiveSessions(user: number): Promise<Sess[]> {
        try {
            const realm = await this.getRealm(user);
            const x = await this.service.query(
                `select a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, b.name) || ' (' || a.id || ')' as game, coalesce(d.filename, b.filename) || coalesce(h.suffix, '') as filename, 
                        a.created as created, c.name as creator, b.players_total as players_total, a.last_setup as last_setup,
                        string_agg(
                            case
                              when e.is_ai = 1 then 'AI'
                              else f.name
                            end || ' (' || e.player_num || 
                        ')', ' / ' order by e.player_num) as player_name,
                        coalesce(a.last_turn, 0) as last_turn, coalesce(a.selector_value, 0) as selector_value, x.id as ai,
                        a.timecontrol_id, t.name as timecontrol
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id)
                 inner  join users c on (c.id = a.user_id and c.realm_id = $1)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join user_games e on (e.session_id = a.id)
                 inner  join users f on (f.id = e.user_id and f.realm_id = $2)
                 left   join user_games g on (g.session_id = a.id and g.user_id = $3 and g.is_ai = 0)
                 left   join game_styles h on (h.game_id = b.id and h.player_num = g.player_num)
                 left   join user_games x on (x.session_id = a.id and x.is_ai = 1)
                 left   join time_controls t on (t.id = a.timecontrol_id)
                 where  a.status_id = 2 and a.closed is null
                 group  by a.id, a.status_id, a.game_id, d.id, d.name, b.name, d.filename, b.filename, a.created, c.name, b.players_total, a.last_setup, h.suffix, x.id, a.timecontrol_id, t.name
                 order  by a.changed desc`, [realm, realm, user]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.variant_id = x.variant_id;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.player_name = x.player_name;
                    it.last_setup = x.last_setup;
                    it.last_turn = x.last_turn;
                    it.selector_value = x.selector_value;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
                    it.ai = x.ai;
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

    async getArchiveSessions(user: number): Promise<Sess[]> {
        try {
            const realm = await this.getRealm(user);
            const x = await this.service.query(
                `select a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, b.name) || ' (' || a.id || ')' as game, coalesce(d.filename, b.filename) || coalesce(h.suffix, '') as filename, 
                        a.created as created, c.name as creator, b.players_total as players_total, a.last_setup as last_setup,
                        string_agg(
                            case
                              when e.is_ai = 1 then 'AI'
                              else f.name
                            end || ' (' || e.player_num || 
                        ')', ' / ' order by e.player_num) as player_name,
                        coalesce(a.last_turn, 0) as last_turn, coalesce(a.selector_value, 0) as selector_value, x.id as ai,
                        a.timecontrol_id, t.name as timecontrol
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id)
                 inner  join users c on (c.id = a.user_id and c.realm_id = $1)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join user_games e on (e.session_id = a.id)
                 inner  join users f on (f.id = e.user_id and f.realm_id = $2)
                 left   join user_games g on (g.session_id = a.id and g.user_id = $3 and g.is_ai = 0)
                 left   join game_styles h on (h.game_id = b.id and h.player_num = g.player_num)
                 left   join user_games x on (x.session_id = a.id and x.is_ai = 1)
                 left   join time_controls t on (t.id = a.timecontrol_id)
                 where  a.status_id = 3
                 group  by a.id, a.status_id, a.game_id, d.id, d.name, b.name, d.filename, b.filename, a.created, c.name, b.players_total, a.last_setup, h.suffix, x.id, a.timecontrol_id, t.name
                 order  by a.changed desc`, [realm, realm, user]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.variant_id = x.variant_id;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.player_name = x.player_name;
                    it.last_setup = x.last_setup;
                    it.last_turn = x.last_turn;
                    it.selector_value = x.selector_value;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
                    it.ai = x.ai;
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

    async getMySessions(user: number): Promise<Sess[]> {
        try {
            const realm = await this.getRealm(user);
            const x = await this.service.query(
                `select a.id as id, a.status_id as status, a.game_id as game_id, d.id as variant_id,
                        coalesce(d.name, b.name) || ' (' || a.id || ')' as game, coalesce(d.filename, b.filename) || coalesce(h.suffix, '') as filename, 
                        a.created as created, c.name as creator, b.players_total as players_total, a.last_setup as last_setup,
                        string_agg(
                            case
                              when e.is_ai = 1 then 'AI'
                              else f.name
                            end || ' (' || e.player_num || 
                        ')', ' / ' order by e.player_num) as player_name,
                        coalesce(a.last_turn, 0) as last_turn, coalesce(a.selector_value, 0) as selector_value, x.id as ai,
                        a.timecontrol_id, t.name as timecontrol
                 from   game_sessions a
                 inner  join games b on (b.id = a.game_id)
                 inner  join users c on (c.id = a.user_id and c.realm_id = $1)
                 left   join game_variants d on (d.id = a.variant_id)
                 inner  join user_games e on (e.session_id = a.id)
                 inner  join users f on (f.id = e.user_id and f.realm_id = $2)
                 inner  join user_games g on (g.session_id = a.id and g.user_id = $3 and g.is_ai = 0)
                 left   join game_styles h on (h.game_id = b.id and h.player_num = g.player_num)
                 left   join user_games x on (x.session_id = a.id and x.is_ai = 1)
                 left   join time_controls t on (t.id = a.timecontrol_id)
                 group  by a.id, a.status_id, a.game_id, d.id, d.name, b.name, d.filename, b.filename, a.created, c.name, b.players_total, a.last_setup, h.suffix, x.id, a.timecontrol_id, t.name
                 order  by a.changed desc`, [realm, realm, user]);
                 let l: Sess[] = x.map(x => {
                    let it = new Sess();
                    it.id = x.id;
                    it.status = x.status;
                    it.game_id = x.game_id;
                    it.game = x.game;
                    it.variant_id = x.variant_id;
                    it.filename = x.filename;
                    it.created = x.created;
                    it.players_total = x.players_total;
                    it.player_name = x.player_name;
                    it.last_setup = x.last_setup;
                    it.last_turn = x.last_turn;
                    it.selector_value = x.selector_value;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
                    it.ai = x.ai;
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

    async getMainTime(sid: number): Promise<number> {
        const x = await this.service.query(
            `select main_time * 1000 as main_time
             from   game_sessions
             where  id = $1`, [sid]);
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

    async joinToSession(user:number, s: Sess, is_ai: boolean): Promise<number> {
        s.player_num = await this.getAvailPlayer(s.id, s.player_num);
        const t = await this.getMainTime(s.id);
        const y = await this.service.createQueryBuilder("user_games")
        .insert()
        .into(user_games)
        .values({
            user_id: user,
            session_id: s.id,
            player_num: s.player_num,
            time_limit: t,
            is_ai: is_ai ? 1 : 0
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
                last_time: null
             })
            .where("id = :id", {id: s.id})
            .execute();
        }
        return uid;
    }

    async findGame(filename: string, realm: number): Promise<number> {
        const x = await this.service.query(
            `select id
             from   games
             where  filename = $1 and realm_id = $2`, [filename, realm]);
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
            const realm = await this.getRealm(user);
            s.id = await this.findSessionByGame(s.filename);
            s.game_id = await this.findGame(s.filename, realm);
            if (!s.game_id) {
                return null;
            }
            if (!s.id) {
                s.id = await this.createAnonymousSession(user, s);
            }
            if (!s.player_num) {
                s.player_num = 1;
            }
            const uid: number = await this.joinToSession(user, s, false);
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

    async findOneById(id: number): Promise<Sess> {
        try {
          const x = await this.service.createQueryBuilder("game_sessions")
          .where("id = :id", {id: id})
          .getOne();
          if (!x) {
            return null;
          }
          let it = new Sess();
          it.id = x.id;
          it.status = x.status_id;
          it.game_id = x.game_id;
          it.variant_id = x.variant_id;
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

    async delSession(id: number): Promise<Sess> {
        try {
            const s = await this.findOneById(id);
            if (!s) {
                return null;
            }
            await this.service.createQueryBuilder("ai_response")
            .delete()
            .from(ai_response)
            .where(`session_id  = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("ai_request")
            .delete()
            .from(ai_request)
            .where(`session_id  = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("tournament_games")
            .update(tournament_games)
            .set({ 
                session_id: null
             })
            .where(`session_id = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("game_alerts")
            .delete()
            .from(game_alerts)
            .where(`session_id = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("game_moves")
            .delete()
            .from(game_moves)
            .where(`session_id = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("challenge")
            .delete()
            .from(challenge)
            .where(`session_id = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("user_games")
            .delete()
            .from(user_games)
            .where(`session_id = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("game_sessions")
            .delete()
            .from(game_sessions)
            .where(`id = :id`, {id: id})
            .execute();
            return s;
        } catch(error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async clearWaiting(): Promise<boolean> {
        const dt = new Date();
        await this.service.createQueryBuilder("ai_response")
        .delete()
        .from(ai_response)
        .where(`session_id in (select id
            from   game_sessions
            where  status_id = 1 and is_protected = 0
            and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("ai_request")
        .delete()
        .from(ai_request)
        .where(`session_id in (select id
            from   game_sessions
            where  status_id = 1 and is_protected = 0
            and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("tournament_games")
        .update(tournament_games)
        .set({ 
            session_id: null
         })
        .where(`session_id in (select id
            from   game_sessions
            where  status_id = 1 and is_protected = 0
            and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("game_alerts")
        .delete()
        .from(game_alerts)
        .where(`session_id in (select id
                               from   game_sessions
                               where  status_id = 1 and is_protected = 0
                               and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("game_moves")
        .delete()
        .from(game_moves)
        .where(`session_id in (select id
                               from   game_sessions
                               where  status_id = 1 and is_protected = 0
                               and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("challenge")
        .delete()
        .from(challenge)
        .where(`session_id in (select id
                               from   game_sessions
                               where  status_id = 1 and is_protected = 0
                               and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("user_games")
        .delete()
        .from(user_games)
        .where(`session_id in (select id
                               from   game_sessions
                               where  status_id = 1 and is_protected = 0
                               and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("game_sessions")
        .delete()
        .from(game_sessions)
        .where("status_id = 1 and is_protected = 0 and created + interval '1 week' < :dt", {dt: dt})
        .execute();
        return true;
    }

    async clearObsolete(): Promise<boolean> {
        const dt = new Date();
        await this.service.createQueryBuilder("ai_response")
        .delete()
        .from(ai_response)
        .where(`session_id in (select id
            from   game_sessions
            where  status_id = 1 and is_protected = 0
            and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("ai_request")
        .delete()
        .from(ai_request)
        .where(`session_id in (select id
            from   game_sessions
            where  status_id = 1 and is_protected = 0
            and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("tournament_games")
        .update(tournament_games)
        .set({ 
            session_id: null
         })
        .where(`session_id in (select id
            from   game_sessions
            where  status_id = 1 and is_protected = 0
            and    created + interval '1 week' < :dt)`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("game_alerts")
        .delete()
        .from(game_alerts)
        .where(`session_id in (select a.id
                               from   game_sessions a
                               where  a.status_id = 1 and a.is_protected = 0
                               and    a.changed + interval '1 month' < :dt
                               except
                               select c.id
                               from   bonuses a
                               inner  join user_games b on (b.id = a.uid)
                               inner  join game_sessions c on (c.id = b.session_id))`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("game_moves")
        .delete()
        .from(game_moves)
        .where(`session_id in (select a.id
                               from   game_sessions a
                               where  a.status_id = 1 and a.is_protected = 0
                               and    a.changed + interval '1 month' < :dt
                               except
                               select c.id
                               from   bonuses a
                               inner  join user_games b on (b.id = a.uid)
                               inner  join game_sessions c on (c.id = b.session_id))`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("challenge")
        .delete()
        .from(challenge)
        .where(`session_id in (select a.id
                               from   game_sessions a
                               where  a.status_id = 1 and a.is_protected = 0
                               and    a.changed + interval '1 month' < :dt
                               except
                               select c.id
                               from   bonuses a
                               inner  join user_games b on (b.id = a.uid)
                               inner  join game_sessions c on (c.id = b.session_id))`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("user_games")
        .delete()
        .from(user_games)
        .where(`session_id in (select a.id
                               from   game_sessions a
                               where  a.status_id = 1 and a.is_protected = 0
                               and    a.changed + interval '1 month' < :dt
                               except
                               select c.id
                               from   bonuses a
                               inner  join user_games b on (b.id = a.uid)
                               inner  join game_sessions c on (c.id = b.session_id))`, {dt: dt})
        .execute();
        await this.service.createQueryBuilder("game_sessions")
        .delete()
        .from(game_sessions)
        .where(`id in (select a.id
                       from   game_sessions a
                       where  a.status_id = 1 and a.is_protected = 0
                       and    a.changed + interval '1 month' < :dt
                       except
                       select c.id
                       from   bonuses a
                       inner  join user_games b on (b.id = a.uid)
                       inner  join game_sessions c on (c.id = b.session_id))`, {dt: dt})
        .execute();
        return true;
    }

    async getLastId(sid: number, uid: number): Promise<number> {
        let x = await this.service.query(
            `select max(id) as last_id
             from   game_moves
             where  session_id = $1 and uid = $2`, [sid, uid]);
        if (!x || x.length == 0) {
             return null;
        }
        return x[0].last_id;
    }

    async rollbackSess(r: string, sid:number, uid: number): Promise<string> {
        const last_id = await this.getLastId(sid, uid);
        if (last_id) {
            let x = await this.service.query(
                `select setup_str, turn_num
                 from   game_moves
                 where  id = $1`, [last_id]);
            if (!x || x.length == 0) {
                 return null;
            }
            r = x[0].setup_str;
            await this.service.createQueryBuilder("game_moves")
            .update(game_moves)
            .set({ 
                accepted: null
             })
            .where("session_id = :sid and turn_num > :turn", {sid: sid, turn: x[0].turn_num})
            .execute();
            await this.service.createQueryBuilder("game_sessions")
            .update(game_sessions)
            .set({ 
                last_turn: x[0].turn_num
             })
            .where("id = :sid", {sid: sid})
            .execute();
        }
        return r;
    }

    async getAiTimeout(sid: number): Promise<number> {
        let x = await this.service.query(
            `select b.curr_value as ai_timeout
             from   game_sessions a
             inner  join games c on (c.id = a.game_id)
             left   join game_variants d on (d.id = a.variant_id)
             inner  join user_games e on (e.session_id = a.id and e.user_id <> coalesce(d.external_ai, c.external_ai))
             inner  join user_games f on (f.session_id = a.id and f.user_id = coalesce(d.external_ai, c.external_ai))
             inner  join ai_settings b on (
                    b.game_id = a.game_id and 
                    coalesce(b.variant_id, 0) = coalesce(a.variant_id, 0) and
                    coalesce(b.selector_value, 0) = coalesce(a.selector_value, 0) and
                    b.user_id = e.user_id and
                    b.external_ai = f.user_id
             )
             where  a.id = $1`, [sid]);
        if (!x || x.length == 0) {
             return 1000;
        }
        return x[0].ai_timeout;
    }

    async setLastUser(sid: number, uid: number): Promise<void> {
        await this.service.createQueryBuilder("game_sessions")
        .update(game_sessions)
        .set({ 
            last_user: uid
         })
        .where("id = :id", {id: sid})
        .execute();
    }

    async setLastTime(sid: number): Promise<void> {
        await this.service.createQueryBuilder("game_sessions")
        .update(game_sessions)
        .set({ 
            last_time: Date.now()
         })
        .where("id = :id and last_time is null", {id: sid})
        .execute();
    }

    async getTimeLimit(uid: number): Promise<number> {
        let x = await this.service.query(
            `select a.time_limit, b.last_time
             from   user_games a
             inner  join game_sessions b on (b.id = a.session_id)
             where  a.id = $1`, [uid]);
        if (!x || x.length == 0) {
             return null;
        }
        let time_limit  = x[0].time_limit;
        if (time_limit !== null) {
            const last_time = x[0].last_time;
            if (last_time && (Date.now() > last_time)) {
                time_limit -= Date.now() - last_time;
            }
        }
        return time_limit;
    }

    async getAdditionalTime(sid: number): Promise<number> {
        const x = await this.service.query(
            `select additional_time
             from   game_sessions
             where  id = $1`, [sid]);
        if (!x || x.length == 0) {
             return null;
        }
        return x[0].additional_time * 1000;
    }

    async isRoot(user:number): Promise<boolean> {
        const x = await this.service.query(
            `select id
             from   users
             where  id = $1 and is_admin = 1`, [user]);
        if (!x || x.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    async recovery(user:number, s: Sess): Promise<Sess> {
        try {
            await this.service.createQueryBuilder("game_moves")
            .update(game_moves)
            .set({ 
                accepted: new Date()
             })
            .where("session_id = :sid and accepted is null", {sid: s.id})
            .execute();
            let x = await this.service.query(
                `select c.id as game_id, coalesce(v.name, c.name) as game, coalesce(v.filename, c.filename) as filename,
                        c.players_total as players_total, a.last_setup as last_setup,
                        b.player_num as player_num, b.id as uid, b.user_id as user_id,
                        a.status_id as status_id, d.id as ai, a.last_user as last_user,
                        e.result_id as result_id, b.is_ai as is_ai, a.variant_id as variant_id,
                        v.ai_flags as ai_flags, v.width as width, v.height as height,
                        v.is_dice
                 from   game_sessions a
                 inner  join user_games b on (b.session_id = a.id and b.is_ai = 0)
                 left   join user_games d on (d.session_id = a.id and d.is_ai = 1)
                 inner  join games c on (c.id = a.game_id)
                 left   join game_alerts e on (e.session_id = a.id)
                 left   join game_variants v on (v.id = a.variant_id)
                 where  a.id = $1`, [s.id]);
            if (!x || x.length == 0) {
                 return null;
            }
            if (s.setup_required) {
                if (!x[0].last_setup) return null;
                delete s.last_setup;
            }
            if (!x[0].last_setup && s.last_setup) {
                await this.service.createQueryBuilder("game_sessions")
                .update(game_sessions)
                .set({ 
                    last_setup: s.last_setup
                 })
                .where("id = :id", {id: s.id})
                .execute();
            }
            s.game_id = x[0].game_id;
            s.variant_id = x[0].variant_id;
            s.ai_flags = x[0].ai_flags;
            s.width = x[0].width;
            s.height = x[0].height;
            s.game = x[0].game;
            s.filename = x[0].filename;
            s.players_total = x[0].players_total;
            s.last_setup = x[0].last_setup;
            s.is_dice = x[0].is_dice;
            if (x[0].status_id == 2) {
                s.is_admin = await this.isRoot(user);
            }
            s.ai_timeout = await this.getAiTimeout(s.id);
            x = x.filter((it) => { return (it.user_id == user) && (it.is_ai == 0); });
            if ((x.length == 1) && (x[0].status_id != 3)) {
                s.player_num = x[0].player_num;
                s.uid = x[0].uid;
                if (x[0].ai) {
                    s.ai = x[0].ai;
                }
                if (x[0].last_user && s.uid) {
                    if (x[0].last_user != s.uid) {
                        await this.setLastUser(s.id, s.uid);
                        await this.setLastTime(s.id);
                    }
                    s.time_limit = await this.getTimeLimit(s.uid);
                    s.additional_time = await this.getAdditionalTime(s.id);
                    if (!s.ai && !x[0].result_id && (x[0].last_user != s.uid) && (x[0].is_dice == 0)) {
                        s.last_setup = await this.rollbackSess(s.last_setup, s.id, s.uid);
                    }
                }
                if (x[0].is_dice != 0) {
                    await this.service.createQueryBuilder("game_moves")
                    .update(game_moves)
                    .set({ 
                        accepted: new Date()
                     })
                    .where("session_id = :sid and uid <> :uid and accepted is null", {sid: s.id, uid: s.uid})
                    .execute();
                }
            }
            if (s.ai && !Number.isInteger(s.ai)) {
                delete s.ai;
            }
            return s;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async getSuffix(game: number, player_num: number): Promise<string> {
        let x = await this.service.query(
            `select a.suffix as suffix
             from   game_styles a
             where  a.game_id = $1 and a.player_num = $2`, [game, player_num]);
        if (!x || x.length == 0) {
             return "";
        }
        return x[0].suffix;
    }

    async isInternalAi(game_id: number, variant_id: number, selector_value: number, player_num: number): Promise<boolean> {
        let x = await this.service.query(
            `select count(*) as cnt
             from   game_bots
             where  game_id = $1 and coalesce(variant_id, $2) = $3
             and    coalesce(selector_value, $4) = $5
             and    coalesce(player_num, $6) = $7`, [game_id, variant_id, variant_id, selector_value, selector_value, player_num, player_num]);
        if (!x || x.length == 0) {
             return false;
        }
        return x[0].cnt > 0;
    }

    async getExternalAI(game_id: number, variant_id: number): Promise<number> {
        if (variant_id) {
            let x = await this.service.query(
                `select a.external_ai
                 from   game_variants a
                 where  a.id = $1`, [variant_id]);
            if (x && x.length > 0) {
                return x[0].external_ai;
            }
        }
        let x = await this.service.query(
            `select a.external_ai
             from   games a
             where  a.id = $1`, [game_id]);
        if (x && x.length > 0) {
             return x[0].external_ai;
        }
        return null;
    }

    async findPairSession(user: number, sess: Sess): Promise<Sess> {
        let x = await this.service.query(
            `select a.id
             from   game_sessions a
             inner  join user_games b on (b.session_id = a.id and b.user_id <> $1 and b.is_ai = 0 and b.player_num <> coalesce($2, b.player_num + 1))
             left   join game_variants c on (c.external_ai = b.user_id)
             left   join games d on (d.external_ai = b.user_id)
             where  a.status_id = 1 and a.game_id = $3 and coalesce(a.variant_id, 0) = coalesce($4, 0)
             and    coalesce(a.selector_value, 0) = coalesce($5, 0) and c.id is null and d.id is null`, 
             [user, sess.player_num, sess.game_id, sess.variant_id, sess.selector_value]);
        if (!x || x.length == 0) {
            return null;
        }
        sess.id = x[0].id;
        await this.joinToSession(user, sess, false);
        return sess;
    }

    async getTimeControl(id: number): Promise<GameTime> {
        const x = await this.service.query(
            `select id, name, main_time, additional_time, is_sandglass
             from   time_controls
             where  id = $1`, [id]);
        if (!x || x.length == 0) {
             return null;
        }
        let r = new GameTime();
        r.id = x[0].id;
        r.name = x[0].name;
        r.main_time = x[0].main_time;
        r.additional_time = x[0].additional_time;
        r.is_sandglass = x[0].is_sandglass;
        return r;
    }

    async createSession(user:number, x: Sess): Promise<Sess> {
        try {
            if (!x.with_ai) {
                const r = await this.findPairSession(user, x);
                if (r) {
                    return r;
                }
            }
            const suffix = await this.getSuffix(x.game_id, x.player_num);
            await this.clearWaiting();
            await this.clearObsolete();
            let t: GameTime = null;
            if (x.timecontrol_id) {
                t = await this.getTimeControl(x.timecontrol_id);
            }
            const y = await this.service.createQueryBuilder("game_sessions")
            .insert()
            .into(game_sessions)
            .values({
                game_id: x.game_id,
                user_id: user,
                status_id: 1,
                variant_id: x.variant_id,
                selector_value: x.selector_value,
                timecontrol_id: x.timecontrol_id,                
                main_time: t ? t.main_time : null,
                additional_time: t ? t.additional_time : null,
                is_sandglass: t ? t.is_sandglass : false,
                last_time: null
            })
            .returning('*')
            .execute();
            x.id = y.generatedMaps[0].id;
            if (!x.player_num) {
                x.player_num = 1;
            }
            await this.joinToSession(user, x, x.ai == 1);
            if (suffix) {
                x.filename = x.filename + suffix;
            }
            if (x.with_ai) {
                const player_num = x.player_num;
                const f = await this.isInternalAi(x.game_id, x.variant_id, x.selector_value, x.player_num);
                const external_ai = await this.getExternalAI(x.game_id, x.variant_id);
                if (f || !external_ai) {
                    await this.joinToSession(user, x, true);
                } else {
                    await this.joinToSession(external_ai, x, false);
                    x.with_ai = false;
                }
                x.player_num = player_num;
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
            `select a.session_id
             from   user_games a
             inner  join game_sessions b on (b.id = a.session_id and b.closed is null)
             where  a.id = $1`, [uid]);
        if (!x || x.length != 1) {
             return null;
        }
        return x[0].session_id;
    }

    async changeAiSettings(sid, winner, loser): Promise<boolean> {
        const x = await this.service.query(
            `select e.id as uid, d.user_id as ai, e.user_id as user, 
                    a.game_id as game_id, a.variant_id as variant_id,
                    a.selector_value as selector_value
             from   game_sessions a
             inner  join games b on (b.id = a.game_id)
             left   join game_variants c on (c.id = a.variant_id)
             inner  join user_games d on (d.session_id = a.id and d.user_id = coalesce(c.external_ai, b.external_ai))
             inner  join user_games e on (e.session_id = a.id and e.user_id <> coalesce(c.external_ai, b.external_ai))
             where  a.id = $1`, [sid]);
        if (!x || x.length == 0) {
             return false;
        }
        let is_win = true;
        if (winner && (winner != x[0].uid)) {
            is_win = false;
        }
        if (loser && (loser == x[0].uid)) {
            is_win = false;
        }
        const y = await this.service.query(
            `select d.id, d.curr_value, d.max_value, d.inc_value, d.dec_value
             from   game_sessions a
             inner  join games b on (b.id = a.game_id)
             left   join game_variants c on (c.id = a.variant_id)
             inner  join ai_settings d on (
                    d.game_id = b.id and
                    coalesce(d.variant_id, 0) = coalesce(c.id, 0) and
                    coalesce(d.selector_value, 0) = coalesce(a.selector_value, 0) and
                    d.external_ai = $1 and d.user_id = $2
             )
             where  a.id = $3`, [x[0].ai, x[0].user, sid]);
        if (!y || y.length == 0) {
            this.service.createQueryBuilder("ai_settings")
            .insert()
            .into(ai_settings)
            .values({
                game_id: x[0].game_id,
                variant_id: x[0].variant_id,
                selector_value: x[0].selector_value,
                user_id: x[0].user,
                external_ai: x[0].ai
            })
            .execute();
        } else {
            let v = y[0].curr_value;
            if (is_win) {
                v += y[0].inc_value;
                if (v > y[0].max_value) {
                    v = y[0].max_value;
                }
            } else {
                v -= y[0].dec_value;
                if (v < 0) {
                    v = 0;
                }
            }
            await this.service.createQueryBuilder("ai_settings")
            .update(ai_settings)
            .set({ 
                curr_value: v
             })
            .where("id = :id", {id: y[0].id})
            .execute();
        }
        return true;
    }

    async getTournament(sess: number): Promise<Tourn> {
        const x = await this.service.query(
            `select b.id, coalesce(c.scores, 0) as win_scores, coalesce(d.scores, 0) as lose_scores, coalesce(e.scores, 0) as draw_scores,
                    a.player_a, a.player_b, b.ratingtype_id
             from   tournament_games a
             inner  join tournaments b on (b.id = a.tournament_id)
             left   join game_scores c on (c.game_id = b.game_id and (b.variant_id is null or coalesce(c.variant_id, b.variant_id) = b.variant_id) and c.result_id = 1)
             left   join game_scores d on (d.game_id = b.game_id and (b.variant_id is null or coalesce(d.variant_id, b.variant_id) = b.variant_id) and d.result_id = 2)
             left   join game_scores e on (e.game_id = b.game_id and (b.variant_id is null or coalesce(e.variant_id, b.variant_id) = b.variant_id) and e.result_id = 3)
             where  a.session_id = $1`, [sess]);
        if (!x || x.length == 0) return null;
        let r = new Tourn();
        r.id = x[0].id;
        r.win_scores  = x[0].win_scores;
        r.lose_scores = x[0].lose_scores;
        r.draw_scores = x[0].draw_scores;
        r.player_a = x[0].player_a;
        r.player_b = x[0].player_b;
        r.ratingtype_id = x[0].ratingtype_id;
        return r;
    }

    async getResult(sess: number): Promise<number> {
        const x = await this.service.query(
            `select c.result_id
             from   tournament_games a
             inner  join tournament_users b on (b.id = a.player_a)
             inner  join user_games c on (c.session_id = a.session_id and c.user_id = b.user_id)
             where  a.session_id = $1`, [sess]);
        if (!x || x.length == 0) return null;
        return x[0].result_id;
    }

    async updateScores(id: number, score: number, res: number): Promise<void> {
        const x = await this.service.query(
            `select score, total, win, lose
             from   tournament_users
             where  id = $1`, [id]);
        if (!x || x.length == 0) return;
        await this.service.createQueryBuilder("tournament_users")
        .update(tournament_users)
        .set({ 
            score: +x[0].score + +score,
            total: +x[0].total + 1,
            win:   +x[0].win   + (res == 1 ? 1 : 0),
            lose:  +x[0].lose  + (res == 2 ? 1 : 0)
         })
        .where("id = :id", {id: id})
        .execute();
    }

    async getRating(id: number): Promise<any> {
        const x = await this.service.query(
            `select coalesce(c.rating, 1400) as rating, c.id
             from   tournament_users a
             inner  join tournaments b on (b.id = a.tournament_id)
             left   join user_ratings c on (
                    c.user_id = a.user_id and c.type_id = b.ratingtype_id and
                    c.game_id = b.game_id and coalesce(c.variant_id, 0) = coalesce(b.variant_id, 0) )
             where  a.id = $1`, [id]);
        if (!x || x.length == 0) return null;
        return {
            id: x[0].id,
            rating: x[0].rating
        }
    }

    getK(r: number): number {
        let x = 40;
        if (r > 1400) x = 20;
        if (r > 2400) x = 10;
        return x;
    }

    async updateRating(id: number, old: number, delta: number): Promise<void> {
        if (id) {
            await this.service.createQueryBuilder("user_ratings")
            .update(user_ratings)
            .set({ 
                rating: +old + delta,
                is_inc: delta > 0
             })
            .where("id = :id", {id: id})
            .execute();
        }
    }

    async updateElo(a: number, b: number, sa: number, sb: number): Promise<void> {
        const ra = await this.getRating(a); 
        const rb = await this.getRating(b); 
        const ea = 1 / (Math.pow(10, (rb.rating - ra.rating) / 400) + 1);
        const eb = 1 / (Math.pow(10, (ra.rating - rb.rating) / 400) + 1);
        const ka = this.getK(ra.rating); const kb = this.getK(rb.rating);
        const da = ka * (sa - ea); const db = kb * (sb - eb);
        await this.updateRating(ra.id, ra.rating, da);
        await this.updateRating(rb.id, rb.rating, db);
    }

    async supportTournament(sess: number): Promise<void> {
        const t = await this.getTournament(sess);
        const r = await this.getResult(sess);
        if (!t || !r) return;
        if ((r == 3) && (t.draw_scores > 0)) {
            await this.updateScores(t.player_a, +t.draw_scores, 3);
            await this.updateScores(t.player_b, +t.draw_scores, 3);
            if (t.ratingtype_id == 1) {
                await this.updateElo(t.player_a, t.player_b, t.draw_scores, t.draw_scores);
            }
        }
        if (r == 1) {
            await this.updateScores(t.player_a, +t.win_scores, 1);
            await this.updateScores(t.player_b, +t.lose_scores, 2);
            if (t.ratingtype_id == 1) {
                await this.updateElo(t.player_a, t.player_b, t.win_scores, t.lose_scores);
            }
        }
        if (r == 2) {
            await this.updateScores(t.player_a, +t.lose_scores, 2);
            await this.updateScores(t.player_b, +t.win_scores, 1);
            if (t.ratingtype_id == 1) {
                await this.updateElo(t.player_b, t.player_a, t.win_scores, t.lose_scores);
            }
        }
        await this.service.createQueryBuilder("tournament_games")
        .update(tournament_games)
        .set({ 
            result_id: r
         })
        .where("session_id = :id", {id: sess})
        .execute();
    }

    async getNextUid(sid: number): Promise<number> {
        const x = await this.service.query(
            `select b.id
             from   game_sessions a
             inner  join user_games b on (b.session_id = a.id and b.id <> a.last_user)
             where  a.id = $1`, [sid]);
        if (!x || x.length == 0) return null;
        return x[0].id;
    }

    async closeSession(x: Sess): Promise<Sess> {
        try {
            if (!x.id) {
                if (x.winner) {
                    x.id = await this.getSession(x.winner);
                }
                if (x.loser) {
                    x.id = await this.getSession(x.loser);
                }
            } else if (!x.winner && !x.loser) {
                x.loser = await this.getNextUid(x.id);
                if (!x.loser) x.id = null;
            }
            if (!x.id) return null;
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
            } else {
                await this.changeAiSettings(x.id, x.winner, x.loser);
            }
            if (x.winner && !x.loser) {
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
            }
            if (x.loser && !x.winner) {
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
            await this.supportTournament(x.id);
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
