import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { challenge } from '../entity/challenge';
import { Repository } from 'typeorm';
import { Challenge } from '../interfaces/challenge.interface';

@Injectable()
export class ChallengeService {

    constructor(
        @Inject('CHALLENGE_REPOSITORY')
        private readonly service: Repository<challenge>
    ) {}  

    async getChallengesByUser(id: number): Promise<Challenge[]> {
        try {
            const x = await this.service.query(
                `select a.id as id, a.session_id as session_id, b.user_id as user_id
                        c.name as user, a.player_num as player_num
                 from   challenge a
                 inner  join game_sessions b on (b.id = a.session_id)
                 inner  join users c on (c.id = b.user_id)
                 where  coalesce(a.user_id, $1) = $2`, [id, id]);
            if (!x || x.length != 1) {
                return null;
            }
            let l: Challenge[] = x.map(x => {
                let it = new Challenge();
                it.id = x.id;
                it.session_id = x.session_id;
                it.user_id = x.user_id;
                it.user = x.user;
                it.player_num = x.player_num;
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

    async findOne(user: number, id: number): Promise<Challenge> {
        try {
          const x = await this.service.createQueryBuilder("challenge")
          .where("challenge.user_id = :user_id and challenge.id = :id", { user_id: user, id: id })
          .getOne();
          if (!x) {
            return null;
          }
          let it = new Challenge();
          it.id = x.id;
          it.session_id = x.session_id;
          it.user_id = x.user_id;
          it.player_num = x.player_num;
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async addChallenge(x: Challenge): Promise<Challenge> {
        try {
            const y = await this.service.createQueryBuilder("challenge")
            .insert()
            .into(challenge)
            .values({
                session_id: x.session_id,
                player_num: x.player_num
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
    async delChallenge(user: number, id: number): Promise<Challenge> {
        try {
            const x = await this.findOne(user, id);
            if (!x) {
                return null;
            }
            await this.service.createQueryBuilder("challenge")
            .delete()
            .from(challenge)
            .where("challenge.user_id = :user_id and challenge.session_id = :id", { user_id: user, id: id })
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
