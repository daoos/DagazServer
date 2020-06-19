import { Controller, UseGuards, Get, Req, Res, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Sess } from '../interfaces/sess.interface';

@ApiSecurity('bearer')
@Controller('api/session')
export class SessionController {

    constructor(
        private readonly service: SessionService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Req() request: Request, @Res() res): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getInitSesssions(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getSession(@Res() res, @Param('id') id): Promise<Sess> {
        try {
            const r = await this.service.getSesssionById(id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: [Sess] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: Sess): Promise<Sess> {
        const user: any = request.user;
        try {
            const r = await this.service.createSesssion(user.id, x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
