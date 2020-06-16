import { Controller, Get, Res, Param, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiSecurity } from '@nestjs/swagger';
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
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Req() request: Request, @Res() res): Promise<Pref[]> {
        const user: any = request.user;
        try {
            const r = await this.service.findByUser(user.userId);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
