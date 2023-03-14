import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { bonuses } from '../entity/bonuses';
import { Repository } from 'typeorm';
import { Bonus } from '../interfaces/bonus.interface';

@Injectable()
export class BonusService {

    constructor(
        @Inject('BONUS_REPOSITORY')
        private readonly service: Repository<bonuses>
    ) {}  

    async getDigest(uid: number): Promise<string> {
        const x = await this.service.query(
            `select coalesce(b.last_setup, '') || d.value_str as digest
             from   user_games a
             inner  join game_sessions b on (b.id = a.session_id)
             inner  join tokens d on (d.user_id = a.user_id and d.type_id = 1)
             where  a.id = $1`, [uid]);
        if (!x || x.length != 1) {
            return null;
        }
        return x[0].digest;
    }

    async bonusFound(bonus: string): Promise<boolean> {
        const x = await this.service.query(
            `select id
             from   bonuses
             where  bonus = $1`, [bonus]);
        if (!x || x.length != 1) {
            return false;
        }
        return true;
    }

    async getBonusType(uid: number): Promise<number> {
        const x = await this.service.query(
            `select d.bonustype_id as type_id
             from   user_games a
             inner  join game_sessions b on (b.id = a.session_id)
             inner  join bonus_games d on (d.game_id = b.game_id and now() >= d.created and (d.expired is null or now() < d.expired))
             where  a.id = $1
             order  by d.expired desc`, [uid]);
        if (!x || x.length != 1) {
            return null;
        }
        return x[0].type_id;
    }

    async getExpirePeriod(uid: number): Promise<number> {
        const x = await this.service.query(
            `select e.expire_period as expire_period
             from   user_games a
             inner  join game_sessions b on (b.id = a.session_id)
             inner  join bonus_games d on (d.game_id = b.game_id and now() >= d.created and (d.expired is null or now() < d.expired))
             inner  join bonus_types e on (e.id = d.bonustype_id)
             where  a.id = $1
             order  by d.expired desc`, [uid]);
        if (!x || x.length != 1) {
            return null;
        }
        return x[0].expire_period;
    }

    async findBonus(bonus: string): Promise<Bonus> {
        const x = await this.service.query(
            `select a.id as id, a.type_id as type_id, a.uid as uid, 
                    a.bonus as bonus, a.created as created, 
                    a.expired as expired, a.activated as activated,
                    a.external_info as info, a.phone, a.email
             from   bonuses a
             where  a.bonus = $1 and now() <= coalesce(a.expired, now())`, [bonus]);
        if (!x || x.length != 1) {
             return null;
        }
        var r = new Bonus();
        r.id = x[0].id;
        r.type_id = x[0].type_id;
        r.uid = x[0].uid;
        r.bonus = x[0].bonus;
        r.created = x[0].created;
        r.expired = x[0].expired;
        r.activated = x[0].activated;
        r.info = x[0].info;
        r.phone = x[0].phone;
        r.email = x[0].email;
        return r;
    }

    async getBonus(bonus: string): Promise<Bonus> {
        try {
            const r = await this.findBonus(bonus);
            if (!r) {
                return null;
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

    async createBonus(x: Bonus): Promise<Bonus> {
        try {
            const type_id = await this.getBonusType(x.uid);
            const digest = await this.getDigest(x.uid);
            if ((type_id === null) || !digest) {
                return null;
            }
            let salt = 0;
            x.bonus = require('crypto').createHash('md5').update(salt.toString(16).toUpperCase() + digest).digest('hex').toUpperCase().substr(1, 16);
            while (await this.bonusFound(x.bonus)) {
                salt++;
                x.bonus = require('crypto').createHash('md5').update(salt.toString(16).toUpperCase() + digest).digest('hex').toUpperCase().substr(1, 16);
            }
            x.created = new Date();
            x.expired = null;
            const days = await this.getExpirePeriod(x.uid);
            if (days !== null) {
                let expired = new Date(x.created);
                expired.setDate(x.created.getDate() + days);
                x.expired = expired;
            }
            const y = await this.service.createQueryBuilder("bonuses")
            .insert()
            .into(bonuses)
            .values({
                uid: x.uid,
                type_id: type_id,
                bonus: x.bonus,
                created: x.created,
                expired: x.expired
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

    async updateBonus(x: Bonus): Promise<Bonus> {
        try {
            const r = await this.findBonus(x.bonus);
            if (!r) {
                return null;
            }
            if (x.name) {
                r.name = x.name;
            }
            if (x.email) {
                r.email = x.email;
            }
            if (x.phone) {
                r.phone = x.phone;
            }
            if (x.service) {
                r.service = x.service;
            }
            if (x.game) {
                r.game = x.game;
            }
            await this.service.createQueryBuilder("bonuses")
            .update(bonuses)
            .set({ 
                name: r.name,
                phone: r.phone,
                email: r.email,
                serv: r.service,
                game: r.game
             })
            .where("id = :id", {id: r.id})
            .execute();
            return r;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async activateBonus(x: Bonus): Promise<Bonus> {
        try {
            const r = await this.findBonus(x.bonus);
            if (!r) {
                return null;
            }
            if (x.info) {
                r.info = x.info;
            }
            if (!r.activated) {
                r.activated = new Date();
            }
            await this.service.createQueryBuilder("bonuses")
            .update(bonuses)
            .set({ 
                external_info: r.info,
                activated: r.activated
             })
            .where("id = :id", {id: r.id})
            .execute();
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
