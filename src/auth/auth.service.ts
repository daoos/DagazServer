import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByLogin(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async login(user: any, device: string) {
      try {
        const payload = { username: user.username, sub: user.id };
        const u = await this.usersService.findOneById(user.id);
        const a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access + "s" });
        const r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh + "s" });
        await this.usersService.clearTokens(user.id, device);
        await this.usersService.addToken(user.id, device, 1, a, jwtConstants.access);
        await this.usersService.addToken(user.id, device, 2, r, jwtConstants.refresh);
        return {
          access_token: a,
          refresh_token: r,
          role: u.is_admin
        };
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

    async anonymous(username: string) {
      try {
        let user = await this.usersService.findOneByLogin(username);
        if (user === null) {
            user = await this.usersService.createUser(username);
        }
        let a = await this.usersService.getToken(user.id, 1);
        let r = await this.usersService.getToken(user.id, 2);
        if ((a === null) || (r === null)) {
          const payload = { username: user.username, sub: user.id };
          a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access + "s" });
          r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh + "s" });
          await this.usersService.clearTokens(user.id, username);
          await this.usersService.addToken(user.id, username, 1, a, jwtConstants.access);
          await this.usersService.addToken(user.id, username, 2, r, jwtConstants.refresh);
        }
        return {
          access_token: a,
          refresh_token: r,
          role: 0
        };
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }
}
