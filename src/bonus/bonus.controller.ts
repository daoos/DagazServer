import { Controller, UseGuards, Post, Req, Res, Body, HttpStatus } from '@nestjs/common';
import { ApiSecurity, ApiBody, ApiCreatedResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { BonusService } from './bonus.service';
import { Bonus } from '../interfaces/bonus.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenGuard } from '../auth/token.guard';
import { Request } from 'express';

@ApiSecurity('bearer')
@Controller('api/bonus')
export class BonusController {

    constructor(
        private readonly service: BonusService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post()
    @ApiBody({ type: [Bonus] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async join(@Req() request: Request, @Res() res, @Body() x: Bonus): Promise<Bonus> {
        const user: any = request.user;
        try {
            const r = await this.service.createBonus(user.id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.CREATED).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
