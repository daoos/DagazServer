import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ai_fit } from '../entity/ai_fit';
import { ai_fit_log } from '../entity/ai_fit_log';
import { ai_request } from '../entity/ai_request';
import { ai_response } from '../entity/ai_response';
import { ai_stat } from '../entity/ai_stat';
import { AiFit } from '../interfaces/ai_fit.interface';
import { AiRequest } from '../interfaces/ai_request.interface';
import { AiResponse } from '../interfaces/ai_response.interface';
import { AiStat } from '../interfaces/ai_stat.interface';

@Injectable()
export class AiService {

    constructor(
        @Inject('AI_REPOSITORY')
        private readonly service: Repository<ai_request>
    ) {}  

    async getRequest(sid: number): Promise<AiRequest> {
        const x = await this.service.query(
            `select a.setup, a.completed, a.variant_id
             from   ai_request a
             where  a.session_id = $1`, [sid]);
        if (!x || x.length != 1) return null;
        let r = new AiRequest();
        r.sid = sid;
        r.setup = x[0].setup;
        r.completed = x[0].completed;
        r.variant_id = x[0].variant_id;
        return r;
    }

    async getResponses(sid: number): Promise<AiResponse[]> {
        const x = await this.service.query(
            `select a.move, a.weight
             from   ai_response a
             where  a.session_id = $1`, [sid]);
        let r: AiResponse[] = x.map(x => {
            let it = new AiResponse();
            it.sid = sid;
            it.move = x.move;
            it.weight = x.weight;
            return it;
        });
        return r;
    }

    async getSid(): Promise<AiRequest> {
        try {
            const x = await this.service.query(
                `select nextval('game_sessions_id_seq') as sid`);
            let r = new AiRequest();
            r.sid = x[0].sid;
            return r;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async get(id: number): Promise<AiRequest[]> {
        try {
            const x = await this.service.query(
                `select a.session_id, a.setup, a.coeff, a.variant_id
                 from   ai_request a
                 where  a.variant_id = $1 and a.completed is null and a.requested is null
                 order  by a.created`, [id]);
            let ids = [];
            let r: AiRequest[] = [];
            if (x && x.length > 0) {
                let it = new AiRequest();
                it.sid = x[0].session_id;
                it.variant_id = x[0].variant_id;
                it.setup = x[0].setup;
                it.coeff = x[0].coeff;            
                r.push(it);
                ids.push(x[0].session_id);
            }
            for (let i = 0; i < ids.length; i++) {
                await this.service.createQueryBuilder("ai_request")
                .update(ai_request)
                .set({ 
                    requested: new Date(),
                 })
                .where("session_id = :id", {id: ids[i]})
                .execute();
            }
            return r;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async request(x: AiRequest): Promise<AiResponse[]> {
        try {
            const req = await this.getRequest(x.sid);
            if (!req) {
                await this.service.createQueryBuilder("ai_request")
                .insert()
                .into(ai_request)
                .values({
                    session_id: x.sid,
                    variant_id: x.variant_id,
                    setup: x.setup,
                    coeff: x.coeff
                })
                .execute();
                return [];
            }
            if (req.setup != x.setup) {
                await this.service.createQueryBuilder("ai_response")
                .delete()
                .from(ai_response)
                .where(`session_id  = :id`, {id: x.sid})
                .execute();
                await this.service.createQueryBuilder("ai_request")
                .update(ai_request)
                .set({ 
                    setup: x.setup,
                    created: new Date(),
                    completed: null
                 })
                .where("session_id = :id", {id: x.sid})
                .execute();
                return [];
            }
            if (!req.completed) return [];
            const resp = await this.getResponses(x.sid);
            await this.service.createQueryBuilder("ai_response")
            .delete()
            .from(ai_response)
            .where(`session_id  = :id`, {id: x.sid})
            .execute();
            await this.service.createQueryBuilder("ai_request")
            .delete()
            .from(ai_request)
            .where(`session_id  = :id`, {id: x.sid})
            .execute();
            return resp;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async response(x: AiResponse[]): Promise<AiResponse[]> {
        try {
            let sessions = [];
            for (let i = 0; i < x.length; i++) {
                await this.service.createQueryBuilder("ai_response")
                .insert()
                .into(ai_response)
                .values({
                    session_id: x[i].sid,
                    move: x[i].move,
                    weight: x[i].weight
                })
                .execute();
                if (sessions.indexOf(x[i].sid) < 0) {
                    sessions.push(x[i].sid);
                }
            }
            for (let i = 0; i < sessions.length; i++) {
                await this.service.createQueryBuilder("ai_request")
                .update(ai_request)
                .set({ 
                    completed: new Date()
                 })
                .where("session_id = :id", {id: sessions[i]})
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

    async getFit(game: number, lim: number): Promise<AiFit[]> {
        try {
            let mx = null;
            const x = await this.service.query(
                `select id, variant_id, setup, move
                 from   ai_fit
                 where  variant_id = $1
                 order  by id
                 limit  ` + lim, [game]);
            if (!x || x.length < lim) return [];
            let r: AiFit[] = x.map(x => {
                 let it = new AiFit();
                 it.variant_id = x.variant_id;
                 it.setup = x.setup;
                 it.move = x.move;                 
                 if ((mx === null) || (mx < x.id)) {
                     mx = x.id;
                 }
                 return it;
            });
            for (let i = 0; i < r.length; i++) {
                await this.service.createQueryBuilder("ai_fit_log")
                .insert()
                .into(ai_fit_log)
                .values({
                    variant_id: r[i].variant_id,
                    setup: r[i].setup,
                    move: r[i].move
                })
                .execute();
            }
            if (mx) {
                await this.service.createQueryBuilder("ai_fit")
                .delete()
                .from(ai_fit)
                .where(`id <= :id`, {id: mx})
                .execute();
            }
            return r;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async addFit(x: AiFit): Promise<AiFit> {
        try {
            await this.service.createQueryBuilder("ai_fit")
            .insert()
            .into(ai_fit)
            .values({
                variant_id: x.variant_id,
                setup: x.setup,
                move: x.move
            })
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

    async postStat(x: AiStat): Promise<AiStat> {
        try {
            await this.service.createQueryBuilder("ai_stat")
            .insert()
            .into(ai_stat)
            .values({
                batch_size: x.batch_size,
                epoch_count: x.epoch_count,
                validation_split: x.validation_split,
                time_delta: x.time_delta,
                result: JSON.stringify(x.result),
                model: x.model
            })
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
