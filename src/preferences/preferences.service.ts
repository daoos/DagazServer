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

    async findOne(user: number, game: number): Promise<Pref> {
        try {
          const x = await this.service.createQueryBuilder("user_preferences")
          .where("user_preferences.user_id = :user_id and user_preferences.game_id = :game_id", { user_id: user, game_id: game })
          .getOne();
          if (!x) {
            return null;
          }
          let it = new Pref();
          it.id = x.id;
          it.user_id = x.user_id;
          it.game_id = x.game_id;
          it.created = x.created;
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async addPref(user: number, x: Pref): Promise<Pref> {
        try {
            x.user_id = user;
            x.created = new Date();
            const y = await this.service.createQueryBuilder("user_preferences")
            .insert()
            .into(user_preferences)
            .values({
                user_id: x.user_id,
                game_id: x.game_id,
                created: x.created
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

    async delPref(user: number, game: number): Promise<Pref> {
        let x = await this.findOne(user, game);
        if (!x) {
            return null;
        }
        await this.service.createQueryBuilder("user_preferences")
        .delete()
        .from(user_preferences)
        .where("user_preferences.user_id = :user_id and user_preferences.game_id = :game_id", { user_id: user, game_id: game })
        .execute();
        return x;
    }
}
