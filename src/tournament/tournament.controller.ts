import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenGuard } from '../auth/token.guard';
import { TournamentService } from './tournament.service';
import { Request } from 'express';
import { Tourn } from '../interfaces/tourn.interface';

@ApiSecurity('bearer')
@Controller('api/tournament')
export class TournamentController {

    constructor(
        private readonly service: TournamentService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('active')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async activeTourns(@Req() request: Request, @Res() res): Promise<Tourn[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getActiveTourns(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('closed')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async closedTourns(@Req() request: Request, @Res() res): Promise<Tourn[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getClosedTourns(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post()
    @ApiBody({ type: [Tourn] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: Tourn): Promise<Tourn> {
        const user: any = request.user;
        try {
            const r = await this.service.createTourn(user.id, x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
