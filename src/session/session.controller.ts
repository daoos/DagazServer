import { Controller, UseGuards, Get, Req, Res, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Sess } from '../interfaces/sess.interface';
import { TokenGuard } from '../auth/token.guard';

@ApiSecurity('bearer')
@Controller('api/session')
export class SessionController {

    constructor(
        private readonly service: SessionService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<Sess[]> {
        try {
            const r = await this.service.getActiveSessions();
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getSession(@Res() res, @Param('id') id): Promise<Sess> {
        try {
            const r = await this.service.getSessionById(id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post()
    @ApiBody({ type: [Sess] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: Sess): Promise<Sess> {
        const user: any = request.user;
        try {
            const r = await this.service.createSession(user.id, x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('anonymous')
    @ApiBody({ type: [Sess] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async anonymous(@Req() request: Request, @Res() res, @Body() x: Sess): Promise<Sess> {
        const user: any = request.user;
        try {
            const r = await this.service.anonymous(user.id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.CREATED).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('recovery')
    @ApiBody({ type: [Sess] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async recovery(@Req() request: Request, @Res() res, @Body() x: Sess): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.recovery(user.id, x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post('close')
    @ApiBody({ type: [Sess] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async close(@Res() res, @Body() x: Sess): Promise<Sess> {
        try {
            const r = await this.service.closeSession(x);
            if (!r) {
                return res.status(HttpStatus.FORBIDDEN).json(x);
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
