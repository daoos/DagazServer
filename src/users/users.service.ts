import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { users } from '../entity/users';
import { User } from '../interfaces/user.interface';
import { tokens } from '../entity/tokens';
import { picture } from '../entity/picture';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly service: Repository<users>,
        @Inject('TOKENS_REPOSITORY')
        private readonly tokens: Repository<tokens>,
    ) {}  

    async getToken(id: number, type: number): Promise<string> {
      const x = await this.service.query(
        `select value_str
         from   tokens
         where  user_id = $1 and type_id = $2
         and    now() < expired`, [id, type]);
      if (!x || x.length != 1) {
          return null;
      }
      return x[0].value_str;
    }

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

    async checkToken(user: number, val: string): Promise<tokens> {
      const x = await this.tokens.createQueryBuilder("tokens")
      .where("tokens.user_id = :user_id and value_str = :val", { user_id: user, val: val })
      .getOne();
      if (!x) {
        return null;
      }
      return x;
    }

    async createUser(username: string, realm: number): Promise<User> {
      let x: users = new users();
      x.realm_id = realm;
      x.is_admin = 0;
      x.name = username;
      x.login = username;
      x.pass = username;
      x.is_anonymous = 1;
      const y = await this.service.createQueryBuilder("users")
      .insert()
      .into(users)
      .values(x)
      .returning('*')
      .execute();
      let r: User = new User();
      r.id = y.generatedMaps[0].id;
      r.name = username;
      r.realm = realm;
      r.username = username;
      r.created = new Date();
      return r;
    }

    async addToken(user: number, dev: string, type: number, val: string, sec: number): Promise<tokens> {
      let x: tokens = new tokens();
      x.type_id = type;
      x.user_id = user;
      x.device_str = dev;
      x.value_str = val;
      x.created = new Date();
      x.expired = new Date(x.created.getTime() + sec);
      const y = await this.service.createQueryBuilder("tokens")
      .insert()
      .into(tokens)
      .values(x)
      .returning('*')
      .execute();
      x.id = y.generatedMaps[0].id;
      return x;
    }

    async clearTokens(user: number, dev: string): Promise<boolean> {
      await this.tokens.createQueryBuilder("tokens")
      .delete()
      .from(tokens)
      .where("tokens.user_id = :user_id and tokens.device_str = :dev", { user_id: user, dev: dev })
      .execute();
      return true;
    }
      
    async findAll(user: number): Promise<User[]> {
        try {
          const realm = await this.getRealm(user);
          const u = await this.service.createQueryBuilder("users")
          .where("users.deleted is null or users.deleted > now() and users.realm_id = :realm", { realm: realm})
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

      async touchUser(id: number): Promise<boolean> {
        await this.service.createQueryBuilder("users")
        .update(users)
        .set({ last_actived: new Date()})
        .where("users.id = :id", {id: id})
        .execute();
        return true;
      }

      async recoveryPass(token: string): Promise<User> {
        let x = await this.service.query(
          `select a.user_id as id, b.is_admin as is_admin, b.realm_id as realm_id,
                  b.login as username, a.device_str as device
           from   tokens a
           inner  join users b on (b.id = a.user_id)
           where  a.value_str = $1`, [token]);
           if (!x || x.length == 0) {
                return null;
        }
        let it = new User();
        it.id = x[0].id;
        it.realm = x[0].realm_id;
        it.is_admin = x[0].is_admin;
        it.username = x[0].username;
        it.device = x[0].device;
        return it;
      }

      async findOneByLoginAndPass(name: string, pass: string): Promise<User> {
        try {
          const x = await this.service.createQueryBuilder("users")
          .where("users.login = :name and users.pass = :pass", {name: name, pass: pass})
          .getOne();
          if (!x) {
              return null;
          }
          await this.touchUser(x.id);
          let it = new User();
          it.id = x.id;
          it.realm = x.realm_id;
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

      async findOneByLogin(name: string): Promise<User> {
        try {
          // TODO: Check Activated EMail
          const x = await this.service.createQueryBuilder("users")
          .where("users.login = :name", {name: name})
          .getOne();
          if (!x) {
              return null;
          }
          await this.touchUser(x.id);
          let it = new User();
          it.id = x.id;
          it.realm = x.realm_id;
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
          if (!x) {
            return null;
          }
          await this.touchUser(x.id);
          let it = new User();
          it.id = x.id;
          it.realm = x.realm_id;
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
    
      async addUser(x: User): Promise<User> {
        try {
          const u = await this.findOneByLogin(x.username);
          if (u) {
              return null;
          }
          // TODO: Verify EMail
          const y = await this.service.createQueryBuilder("users")
          .insert()
          .into(users)
          .values({
            realm_id: x.realm,
            name: x.name,
            login: x.username,
            pass: x.password/*,
            email: x.email*/
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

      async updateUser(user: number, x: User): Promise<User> {
        try {
          await this.service.createQueryBuilder("users")
          .update(users)
          .set({ 
            name: x.name,
            login: x.username,
            email: x.email
          })
          .where("id = :id", {id: user})
          .execute();
          if (x.password) {
            await this.service.createQueryBuilder("users")
            .update(users)
            .set({ 
              pass: x.password
            })
            .where("id = :id", {id: user})
            .execute();
          }
          return await this.findOneById(x.id);
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async delUser(user: number, id: number): Promise<User> {
        try {
          const realm = await this.getRealm(user);
          await this.service.createQueryBuilder("users")
          .update(users)
          .set({ deleted: new Date() })
          .where("users.id = :id and users.realm_id = :realm", {id: id, realm: realm})
          .execute();
          return await this.findOneById(id);
      } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async addFile(user: number, file: any): Promise<void> {
        try {
          await this.service.createQueryBuilder("picture")
          .insert()
          .into(picture)
          .values({
              file_name: file.originalname,
              internal_name: file.filename,
              loaded: new Date()
          })
          .execute();
/*        await this.service.createQueryBuilder("users")
          .update(users)
          .set({ img: file.filename })
          .where("users.id = :id", {id: user})
          .execute();*/
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }
}
