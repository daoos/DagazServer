import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { games } from '../entity/games';
import { Repository } from 'typeorm';
import { Game } from '../interfaces/game.interface';
import { Preview } from '../interfaces/preview.interface';

@Injectable()
export class GameService {

    constructor(
        @Inject('GAME_REPOSITORY')
        private readonly service: Repository<games>
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

      async getGames(user: number): Promise<Game[]> {
        try {
            const realm: number = await this.getRealm(user);
            if (!realm) {
                return null;
            }
            const x = await this.service.query(
                `select id, name, filename, players_total, created, main_time, additional_time,
                        realm_id, max_selector
                 from   games
                 where  realm_id = $1
                 order  by id`, [realm]);
            let l: Game[] = x.map(x => {
                let it = new Game();
                it.id = x.id;
                it.name = x.name;
                it.filename = x.filename;
                it.players_total = x.players_total;
                it.created = x.created;
                it.main_time = x.main_time;
                it.additional_time = x.additional_time;
                it.realm_id = x.realm_id;
                it.max_selector = x.max_selector;
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

    async getVariants(user: number, game: number): Promise<Game[]> {
        try {
            const realm: number = await this.getRealm(user);
            if (!realm) {
                return null;
            }
            const x = await this.service.query(
                `select a.id as id, a.name as name, a.filename as filename, 
                        a.players_total as players_total,
                        a.max_selector as max_selector
                 from   game_variants a
                 inner  join games b on (b.id = a.game_id)
                 where  b.realm_id = $1 and b.id = $2
                 order  by a.id`, [realm, game]);
            let l: Game[] = x.map(x => {
                let it = new Game();
                it.id = x.id;
                it.name = x.name;
                it.filename = x.filename;
                it.players_total = x.players_total;
                it.realm_id = x.realm_id;
                it.max_selector = x.max_selector;
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

    async getPreview(r: Preview): Promise<Preview> {
        try {
            const x = await this.service.query(
                `select id, preview
                 from   game_previews
                 where  filename = $1 and coalesce(selector_value, 0) = $2`, [r.filename, r.selector_value]);
            if (!x || x.length == 0) {
                 return null;
            }
            r.id = x[0].id;
            r.preview = x[0].preview;
            return r;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
