import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { users } from '../entity/users';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly service: Repository<users>
    ) {}  
      
    async findAll(): Promise<User[]> {
        try {
          const u = await this.service.createQueryBuilder("users")
          .where("users.deleted is null or users.deleted > now()")
          .getMany();
          let l: User[] = u.map(x => {
              let it = new User();
              it.id = x.id;
              it.is_admin = x.is_admin;
              it.name = x.name;
              it.username = x.login;
              it.email = x.email;
              it.created = x.created;
              it.deleted = x.deleted;
              it.last_actived = x.last_actived;
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

      async findOneByName(name: string): Promise<User> {
        try {
          const x = await this.service.createQueryBuilder("users")
          .where("users.name = :name", {name: name})
          .getOne();
          let it = new User();
          it.id = x.id;
          it.is_admin = x.is_admin;
          it.name = x.name;
          it.username = x.login;
          it.password = x.pass;
          it.email = x.email;
          it.created = x.created;
          it.deleted = x.deleted;
          it.last_actived = x.last_actived;
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async findOneById(id: number): Promise<User> {
        try {
          const x = await this.service.createQueryBuilder("users")
          .where("users.id = :id", {id: id})
          .getOne();
          let it = new User();
          it.id = x.id;
          it.is_admin = x.is_admin;
          it.name = x.name;
          it.username = x.login;
          it.password = x.pass;
          it.email = x.email;
          it.created = x.created;
          it.deleted = x.deleted;
          it.last_actived = x.last_actived;
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }
    }
