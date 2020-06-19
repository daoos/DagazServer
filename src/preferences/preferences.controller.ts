import { Controller, Get, Res, Param, HttpStatus, UseGuards, Req, Post, Body, Delete } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiSecurity, ApiBody, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Pref } from '../interfaces/pref.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@ApiSecurity('bearer')
@Controller('api/preferences')
export class PreferencesController {

    constructor(
        private readonly service: PreferencesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Req() request: Request, @Res() res): Promise<Pref[]> {
        const user: any = request.user;
        try {
            const r = await this.service.findByUser(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: [Pref] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: Pref): Promise<Pref> {
        const user: any = request.user;
        try {
            const r = await this.service.addPref(user.id, x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<Pref> {
        const user: any = request.user;
        try {
            const r = await this.service.delPref(user.id, id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
