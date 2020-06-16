import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { user_preferences } from '../entity/user_preferences';
import { Repository } from 'typeorm';
import { Pref } from '../interfaces/pref.interface';

@Injectable()
export class PreferencesService {

    constructor(
        @Inject('PREFS_REPOSITORY')
        private readonly service: Repository<user_preferences>
    ) {}  
    
    async findByUser(id: number): Promise<Pref[]> {
        try {
            const u = await this.service.createQueryBuilder("user_preferences")
            .where("user_preferences.user_id = :id", {id: id})
            .getMany();
            let l: Pref[] = u.map(x => {
                let it = new Pref();
                it.id = x.id;
                it.user_id = x.user_id;
                it.game_id = x.game_id;
                it.created = x.created;
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
