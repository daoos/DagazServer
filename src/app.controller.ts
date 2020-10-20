import { Controller, UseGuards, Request, Post, Get, Param } from '@nestjs/common';
import { ApiSecurity, ApiBody, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './interfaces/user.interface';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TokenGuard } from './auth/token.guard';

@ApiSecurity('basic')
@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  @ApiBody({ type: [User] })
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  async login(@Request() req) {
    const device: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const r = await this.authService.login(req.user, device);
    return r;
  }

  @UseGuards(JwtAuthGuard, TokenGuard)
  @Get('api/auth/refresh')
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  async refresh(@Request() req) {
    const device: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const r = await this.authService.login(req.user, device);
    return r;
  }

  @Get('api/auth/anonymous')
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  async anonymous(@Request() req) {
    const device: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const r = await this.authService.anonymous(device);
    return r;
  }

  @Get('api/auth/anonymous/:name')
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  async named(@Param('name') name) {
    const r = await this.authService.anonymous(name);
    return r;
  }
}
