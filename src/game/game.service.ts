import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { games } from '../entity/games';
import { Repository } from 'typeorm';
import { Game } from '../interfaces/game.interface';

@Injectable()
export class GameService {

    constructor(
        @Inject('GAME_REPOSITORY')
        private readonly service: Repository<games>
    ) {}  

    async getGames(): Promise<Game[]> {
        try {
            const x = await this.service.query(
                `select id, name, filename, players_total, created, main_time, additional_time
                 from   games a`);
            let l: Game[] = x.map(x => {
                let it = new Game();
                it.id = x.id;
                it.name = x.name;
                it.filename = x.filename;
                it.players_total = x.players_total;
                it.created = x.created;
                it.main_time = x.main_time;
                it.additional_time = x.additional_time;
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
