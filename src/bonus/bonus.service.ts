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

    async createBonus(user: number, x: Bonus): Promise<Bonus> {
        try {
            // TODO: Игрок должен победить, получить access-token и last-setup
            // TODO: Проверить digest
            // TODO: Получить тип бонуса и expire_period
            const type_id = 1;
            x.expired = null;
            // TODO: Сгенерировать бонус
            x.bonus = "XXXXXXXXXXXXXX";
            x.created = new Date();
            const y = await this.service.createQueryBuilder("bonuses")
            .insert()
            .into(bonuses)
            .values({
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
}
