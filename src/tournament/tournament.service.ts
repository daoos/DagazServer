import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { tournaments } from '../entity/tournaments';
import { Tourn } from '../interfaces/tourn.interface';

@Injectable()
export class TournamentService {
    
    constructor(
        @Inject('TOURN_REPOSITORY')
        private readonly service: Repository<tournaments>
    ) {}  

    async getActiveTourns(user: number): Promise<Tourn[]> {
        try {
            const x = await this.service.query(
                `select a.id, a.game_id, a.variant_id, coalesce(c.name, b.name) as game,
                        a.main_time, a.additional_time, a.created, a.closed
                 from   tournaments a
                 inner  join games b on (b.id = a.game_id)
                 left   join game_variants c on (c.id = a.variant_id)
                 where  a.closed is null and (a.is_hidden = 0 or a.user_id = $1)
                 order  by a.created desc`, [user]);
                 let l: Tourn[] = x.map(x => {
                    let it = new Tourn();
                    it.id = x.id;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.game = x.game;
                    it.main_time = x.main_time;
                    it.additional_time = x.additional_time;
                    it.created = x.created;
                    it.closed = x.closed;
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

    async getClosedTourns(user: number): Promise<Tourn[]> {
        try {
            const x = await this.service.query(
                `select a.id, a.game_id, a.variant_id, coalesce(c.name, b.name) as game,
                        a.main_time, a.additional_time, a.created, a.closed
                 from   tournaments a
                 inner  join games b on (b.id = a.game_id)
                 left   join game_variants c on (c.id = a.variant_id)
                 where  not a.closed is null and (a.is_hidden = 0 or a.user_id = $1)
                 order  by a.created desc`, [user]);
                 let l: Tourn[] = x.map(x => {
                    let it = new Tourn();
                    it.id = x.id;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.game = x.game;
                    it.main_time = x.main_time;
                    it.additional_time = x.additional_time;
                    it.created = x.created;
                    it.closed = x.closed;
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

    async createTourn(user: number, x: Tourn): Promise<Tourn> {
        try {
            const y = await this.service.createQueryBuilder("tournaments")
            .insert()
            .into(tournaments)
            .values({
                game_id: x.game_id,
                variant_id: x.variant_id,
                selector_value: x.selector_value,
                main_time: x.main_time,
                additional_time: x.additional_time,
                is_hidden: x.is_hidden ? 1 : 0,
                user_id: user
            })
            .returning('*')
            .execute();
            x.id = y.generatedMaps[0].id;
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
