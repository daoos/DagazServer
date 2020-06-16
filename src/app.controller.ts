import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { ApiSecurity, ApiBody, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './interfaces/user.interface';

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
    const r = await this.authService.login(req.user);
    return r;
  }
}
